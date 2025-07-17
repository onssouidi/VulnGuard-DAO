import { useParams, useNavigate } from 'react-router-dom';

export default function ProposalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const proposal = {
    id,
    title: `Fix XSS vulnerability`,
    description: `This proposal aims to fix a stored XSS vulnerability found in the profile section of the platform.`,
    status: `Pending validation votes`,
  };

  return (
    <div
      style={{
        background: '#0a0f14',
        minHeight: '100vh',
        color: '#e2e8f0',
        padding: '6rem 2rem 2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1 style={{ color: '#00ff99', marginBottom: '1rem', textAlign: 'center' }}>
        📜 {proposal.title}
      </h1>
      <p style={{ marginBottom: '0.5rem' }}>Proposal ID: {proposal.id}</p>
      <p style={{ marginBottom: '2rem' }}>Status: {proposal.status}</p>

      <div
        style={{
          background: '#11161d',
          padding: '5rem',
          borderRadius: '16px',
          border: '1px solid rgba(0,255,153,0.4)',
          maxWidth: '1200px',
          marginBottom: '2rem',
          width: '95%'
        }}
      >
        <h2 style={{ color: '#00ff99', marginBottom: '0.5rem', fontSize: '2rem' }}>{proposal.title}</h2>
        <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{proposal.description}</p>
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#0f141a', borderRadius: '4px', border: '1px solid rgba(0,255,153,0.3)', display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'0.5rem' }}>
          <strong style={{fontSize:'1.1rem', color:'#e2e8f0'}}>📎 Attached File:</strong>
          <a href="/path/to/report.pdf" download style={{ color: '#00ff99', fontSize:'1rem', textDecoration: 'underline', wordBreak:'break-all' }}>
            report.pdf
          </a>
        </div>
      </div>

      {/* Пример vulnerability report */}
      <div
        style={{
          background: '#11161d',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(0,255,153,0.3)',
          maxWidth: '800px',
          marginBottom: '2rem'
        }}
      >
        <h3 style={{ color: '#00ff99', marginBottom: '1rem' }}>🛡 Example Vulnerability Report</h3>
        <p><strong>Summary:</strong> Stored XSS vulnerability in the user profile page.</p>
        <p><strong>Steps to Reproduce:</strong></p>
        <ul>
          <li>Login as a standard user.</li>
          <li>Navigate to “Edit Profile”.</li>
          <li>Insert malicious script in the “About Me” field.</li>
          <li>Save changes and reload page.</li>
        </ul>
        <p><strong>Impact:</strong> Allows arbitrary JavaScript execution in other users’ browsers.</p>
        <p><strong>Recommendation:</strong> Sanitize user input and escape HTML output.</p>
      </div>

      <div
        style={{
          background: '#11161d',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(0,255,153,0.3)',
          maxWidth: '800px',
          marginBottom: '2rem'
        }}
      >
        <h3 style={{ color: '#00ff99', marginBottom: '1rem' }}>✅ Cast your vote:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label><input type="radio" name={`vote-${proposal.id}`} /> Valid</label>
          <label><input type="radio" name={`vote-${proposal.id}`} /> Spam</label>
          <label><input type="radio" name={`vote-${proposal.id}`} /> Duplicate</label>
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
        className="cta-button"
        style={{ marginTop: '1rem' }}
        onClick={() => navigate('/proposals')}
      >
        ⬅ Back to proposals
      </button>
    </div>
  );
}