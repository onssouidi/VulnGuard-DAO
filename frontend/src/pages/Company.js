import React, { useState, useEffect } from 'react';

export default function Company() {
  const [step, setStep] = useState('choose'); // choose | subscription | unlock
  const [connected, setConnected] = useState(false);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setConnected(true);
          console.log('Connected account:', accounts[0]);
        }
      } catch (error) {
        console.error('User rejected connection or error:', error);
      }
    } else {
      alert('MetaMask not installed!');
    }
  };

  useEffect(() => {
    connectMetamask();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#0a0f14',
        color: '#e2e8f0',
        padding: '2rem'
      }}
    >
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ff99', marginBottom: '3rem', textAlign: 'center' }}>
          🏢 Join as a Company
        </h1>

        {step === 'choose' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
            <div
              style={{
                border: '1px solid #00ff99',
                borderRadius: '8px',
                padding: '1.5rem',
                background: '#11161d',
                cursor: 'pointer'
              }}
              onClick={() => setStep('subscription')}
            >
              <h2 style={{ color: '#00ff99', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                📦 Get Subscription & Early Access
              </h2>
              <p style={{ color: '#ccc', fontSize: '1rem' }}>
                Subscribe monthly in VULN tokens and get full early access to all vulnerability reports.
              </p>
            </div>

            <div
              style={{
                border: '1px solid #00ff99',
                borderRadius: '8px',
                padding: '1.5rem',
                background: '#11161d',
                cursor: 'pointer'
              }}
              onClick={() => setStep('unlock')}
            >
              <h2 style={{ color: '#00ff99', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                🔓 Unlock a Report
              </h2>
              <p style={{ color: '#ccc', fontSize: '1rem' }}>
                Pay per report in VULN tokens and unlock immediate access to selected intelligence.
              </p>
            </div>
          </div>
        )}

        {step !== 'choose' && (
          <div style={{ marginTop: '3rem', maxWidth: '600px' }}>
            <h2 style={{ color: '#00ff99', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {step === 'subscription' ? '📦 Subscription Selected' : '🔓 Unlock Report Selected'}
            </h2>
            <p style={{ color: '#ccc', marginBottom: '2rem' }}>
              Please connect your wallet to proceed with {step === 'subscription' ? 'subscription setup' : 'report purchase'}.
            </p>

            {!connected ? (
              <button
                onClick={connectMetamask}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: '#00ff99',
                  color: '#0a0f14',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                🔗 Connect Metamask
              </button>
            ) : (
              <p style={{ color: '#00ff99', fontWeight: 'bold' }}>✅ Wallet connected!</p>
            )}

            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => setStep('choose')}
                style={{
                  background: 'transparent',
                  color: '#00ff99',
                  border: '1px solid #00ff99',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}