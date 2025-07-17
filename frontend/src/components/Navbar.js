import './Navbar.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', color: '#00ff99' }}>
        VulnDAO
      </Link>

      <ul className="navbar-links">
        <li><Link to="/docs">Documentation</Link></li>
        <li><a href="https://twitter.com/" target="_blank" rel="noreferrer">X</a></li>
        <li><a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a></li>
        <li><a href="https://discord.gg/" target="_blank" rel="noreferrer">Discord</a></li>
        <li><Link to="/dao">DAO</Link></li>
        <li>
          <button className="btn-wallet" onClick={connectWallet}>
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </li>
      </ul>
    </nav>
  );
}