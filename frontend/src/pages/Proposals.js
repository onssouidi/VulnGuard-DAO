import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const tokenAddress = "0xd46198eBd6c4545582Af07985D89b2AE63186fda";
const tokenAbi = [
  "function balanceOf(address owner) view returns (uint256)"
];

function ProposalCard({ proposal }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      style={{
        background: '#11161d',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,255,153,0.2)',
        border: '1px solid rgba(0,255,153,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      <div>
        <h3 style={{ color: '#00ff99', marginBottom: '0.5rem' }}>
          Proposal #{proposal.id}: {proposal.title}
        </h3>
        <p>
          {proposal.phase === 'validation'
            ? '🗳 Validation Voting'
            : '🔥 Severity Voting'}
        </p>
      </div>

      <button
        className="cta-button"
        onClick={() => setShowDetails(true)}
      >
        👁 View Details
      </button>

      {showDetails && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              position: 'relative',
              background: '#0f141a',
              padding: '3rem',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '90%',
              boxShadow: '0 0 20px rgba(0,255,153,0.4)',
              color: '#e2e8f0'
            }}
          >
            <h2 style={{ color: '#00ff99', marginBottom: '1rem', fontSize: '2rem' }}>
              {proposal.title}
            </h2>

            <p style={{ marginBottom: '1rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
              This proposal aims to fix a stored XSS vulnerability found in the profile section.
              Please review the attached report and cast your vote.
            </p>

            <div
              style={{
                marginTop: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#11161d',
                borderRadius: '8px',
                border: '1px solid rgba(0,255,153,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}
            >
              <strong style={{ fontSize: '1.1rem', color: '#e2e8f0' }}>📎 Attached File:</strong>
              <a
                href="/path/to/report.pdf"
                download
                style={{ color: '#00ff99', fontSize: '1rem', textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                report.pdf
              </a>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                {proposal.phase === 'validation' ? 'Cast your validity vote:' : 'Cast your severity vote:'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {proposal.phase === 'validation' && (
                  <>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> ✅ Valid</label>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> 🚫 Spam</label>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> 📂 Duplicate</label>
                  </>
                )}
                {proposal.phase === 'severity' && (
                  <>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> 🔥 Critical</label>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> ⚡ High</label>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> 📈 Medium</label>
                    <label><input type="radio" name={`vote-${proposal.id}`} /> 📉 Low</label>
                  </>
                )}
              </div>
              <button
                className="cta-button"
                style={{ marginTop: '1rem' }}
                onClick={() => alert('Vote submitted!')}
              >
                Submit Vote
              </button>
            </div>

            <button
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#00ff99',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
              onClick={() => setShowDetails(false)}
              aria-label="Close"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Proposals() {
  const [walletAddress, setWalletAddress] = useState('');
  const [showNewProposal, setShowNewProposal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newFile, setNewFile] = useState(null);

  const [hasAccess, setHasAccess] = useState(false);

  async function checkTokenBalance(address) {
    try {
      console.log("🔎 Checking token balance for:", address);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const balance = await tokenContract.balanceOf(address);
      console.log("📦 Token balance (raw):", balance.toString());
      if (balance > 0n) {
        console.log("✅ Balance > 0, access granted");
        setHasAccess(true);
      } else {
        console.log("❌ Balance = 0, access denied");
        setHasAccess(false);
      }
    } catch (err) {
      console.error("Error checking token balance:", err);
      setHasAccess(false);
    }
  }

  useEffect(() => {
    async function checkWallet() {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_accounts', []);
          if (accounts.length > 0) {
            const address = accounts[0];
            setWalletAddress(address);
            await checkTokenBalance(address);
            localStorage.setItem('walletAddress', address);
          } else {
            setWalletAddress('');
            setHasAccess(false);
            localStorage.removeItem('walletAddress');
          }
        } catch (err) {
          console.error('Error checking wallet:', err);
        }
      } else {
        setWalletAddress('');
        setHasAccess(false);
        localStorage.removeItem('walletAddress');
      }
    }
    checkWallet();
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];
        setWalletAddress(address);
        await checkTokenBalance(address);
        localStorage.setItem('walletAddress', address);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('MetaMask not installed!');
    }
  }

  if (!walletAddress) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0f14',
          color: '#00ff99',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋 Welcome to DAO</h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#b0b8c1',
            marginBottom: '2rem',
          }}
        >
          Please connect your wallet in MetaMask to continue.
        </p>
        <button
          onClick={connectWallet}
          style={{
            background: 'none',
            border: '2px solid #00ff99',
            color: '#00ff99',
            fontSize: '1.2rem',
            padding: '1rem 2rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (walletAddress && !hasAccess) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0f14',
          color: '#00ff99',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌ Access Restricted</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          To participate, you must hold our governance token.
        </p>
        <a
          href="https://app.uniswap.org/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#00ff99',
            textDecoration: 'underline',
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}
        >
          Buy Token
        </a>
      </div>
    );
  }

  const proposals = [
    { id: 1, title: 'Fix XSS vulnerability', phase: 'validation', status: 'Pending validation votes' },
    { id: 2, title: 'Add bug bounty program', phase: 'severity', status: 'Voting open' },
  ];

  return (
    <div
      style={{
        background: '#0a0f14',
        minHeight: '100vh',
        color: '#e2e8f0',
        padding: '10rem 2rem 2rem 2rem', // увеличенный отступ сверху
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1 style={{ color: '#00ff99', marginBottom: '1rem' }}>📜 Proposals</h1>
      {walletAddress && (
        <>
          <p style={{ marginBottom: '0.5rem' }}>
            Connected as: {walletAddress}
          </p>
          <p style={{ marginBottom: '2rem', color: '#00ff99' }}>
            Reputation Level: 75
          </p>
        </>
      )}

      <div style={{ marginBottom: '2.5rem' }}>
        <button
          className="cta-button"
          style={{ fontSize: '1.1rem', padding: '0.8rem 1.6rem' }}
          onClick={() => setShowNewProposal(true)}
        >
          ➕ Submit New Proposal
        </button>
      </div>

      <h2
        style={{
          color: '#b0b8c1',
          marginTop: '2rem',
          marginBottom: '1rem',
          fontWeight: 'normal',
          textAlign: 'center'
        }}
      >
        👇 Browse and vote on current proposals:
      </h2>

      <div
        className="proposals-list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '800px'
        }}
      >
        {proposals.map((p) => (
          <ProposalCard key={p.id} proposal={p} />
        ))}
      </div>

      {showNewProposal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              position: 'relative',
              background: '#0f141a',
              padding: '3rem',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '90%',
              boxShadow: '0 0 20px rgba(0,255,153,0.4)',
              color: '#e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <h2 style={{ color: '#00ff99', marginBottom: '1rem' }}>Submit New Proposal</h2>
            <p style={{ color: '#b0b8c1', marginBottom: '1rem', fontSize: '1rem' }}>
              📄 You can download the proposal template{' '}
              <a
                href="/VulnerabilityTemplate.pdf"
                style={{ color: '#00ff99', textDecoration: 'underline' }}
                download
              >
                here
              </a>.
            </p>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', background:'#11161d', border:'1px solid rgba(0,255,153,0.3)', color:'#e2e8f0', borderRadius:'6px' }}
            />
            <textarea
              placeholder="Description"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', minHeight: '100px', background:'#11161d', border:'1px solid rgba(0,255,153,0.3)', color:'#e2e8f0', borderRadius:'6px' }}
            />
            <label
              htmlFor="file-upload"
              style={{
                display: 'inline-flex',
                padding: '0.5rem 1rem',
                maxWidth: '200px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '0.5rem',
                backgroundColor: '#11161d',
                color: '#00ff99',
                border: '1px solid rgba(0,255,153,0.3)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              📁 Choose file
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={e => setNewFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            {newFile && (
              <div style={{ marginTop: '0.5rem', textAlign: 'left', width: '100%' }}>
                <p style={{ color: '#b0b8c1' }}>
                  📎 {newFile.name}
                </p>
              </div>
            )}
            <button
              className="cta-button"
              style={{
                marginTop: '1rem',
                alignSelf: 'flex-start',
                width: 'auto',
                padding: '0.6rem 1.2rem',
                minWidth: '120px',
                textAlign: 'center'
              }}
              onClick={() => {
                alert('Proposal submitted!');
                setShowNewProposal(false);
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowNewProposal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#00ff99',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}