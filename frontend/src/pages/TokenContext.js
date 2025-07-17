import { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export const TokenContext = createContext();

const tokenAddress = "0xd46198eBd6c4545582Af07985D89b2AE63186fda";
const tokenAbi = ["function balanceOf(address owner) view returns (uint256)"];

export function TokenProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [hasAccess, setHasAccess] = useState(false);

  async function checkTokenBalance(address) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const balance = await tokenContract.balanceOf(address);
      setHasAccess(balance > 0n);
    } catch (err) {
      console.error("Error checking token balance:", err);
      setHasAccess(false);
    }
  }

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask not installed!');
      return;
    }
    try {
      // force request accounts to show MetaMask popup every time
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        await checkTokenBalance(address);
      } else {
        setWalletAddress('');
        setHasAccess(false);
      }
    } catch (err) {
      console.warn("User rejected connection or other error:", err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_accounts', []);
          if (accounts.length > 0) {
            const address = accounts[0];
            setWalletAddress(address);
            await checkTokenBalance(address);
          } else {
            // always prompt connect popup on load if no wallet
            await connectWallet();
          }
        } catch (err) {
          console.log('No active wallet:', err);
        }
      } else {
        console.log('MetaMask not detected');
      }
    })();
  }, [connectWallet]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          checkTokenBalance(accounts[0]);
        } else {
          setWalletAddress('');
          setHasAccess(false);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return (
    <TokenContext.Provider value={{ walletAddress, hasAccess, connectWallet }}>
      {children}
    </TokenContext.Provider>
  );
}