

import { useNavigate } from 'react-router-dom';

export default function DaoHub() {
  const navigate = useNavigate();

  function handleSelect(role) {
    localStorage.setItem('role', role);
    if (role === 'researcher') {
      navigate('/proposals');
    } else if (role === 'company') {
      navigate('/company');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0f14',
        color: '#00ff99',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>👋 Welcome to DAO Hub</h1>
      <p style={{ fontSize: '1.2rem', color: '#b0b8c1', marginBottom: '3rem' }}>
        Choose your role to continue:
      </p>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <button
          className="cta-button"
          style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
          onClick={() => handleSelect('researcher')}
        >
          🔬 I am a Researcher
        </button>
        <button
          className="cta-button"
          style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
          onClick={() => handleSelect('company')}
        >
          🏢 I am a Company
        </button>
      </div>
    </div>
  );
}