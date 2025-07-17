import '../App.css';

export default function Home() {
  return (
    <div className="terminal">
      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '8rem',
          paddingBottom: '4rem',
          marginBottom: '0'
        }}
      >
        <h1 style={{ fontSize: '4rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
          VulnDAO<span className="cursor"></span>
        </h1>
        <p
          className="tagline"
          style={{
            fontSize: '1.4rem',
            maxWidth: '900px',
            marginBottom: '3rem'
          }}
        >
          A Web3‑powered decentralized platform for ethical vulnerability disclosure.
          We align incentives between security researchers and organizations.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <button
            className="cta-button"
            style={{ fontSize: '1.3rem', padding: '1rem 2.5rem' }}
            onClick={() => {
              document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Our Mission */}
      <div
        className="mission-block"
        style={{
          textAlign: 'center',
          marginTop: '8rem',
          marginBottom: '8rem'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem' }}>Our Mission</h2>
        <p>
          VulnDAO empowers security researchers and organizations to collaborate
          on ethical vulnerability disclosure. For enterprises, VulnDAO provides
          early access to critical security insights, helping them prevent breaches,
          improve products, and build trust with their users. We align incentives
          through Web3 governance, making security safer and more transparent for everyone.
        </p>
      </div>

      {/* Join DAO */}
      <div
        id="how-it-works"
        className="how-block"
        style={{ scrollMarginTop: '120px', marginBottom: '0.5rem' }}
      >
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Join VulnDAO</h2>
      </div>

      {/* Get Started Section */}
      <div
        className="how-block get-started-block"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '2rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}
      >
        <div
          style={{
            background: '#0f141a',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '280px',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(0,255,153,0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px'
          }}
        >
          <h3 style={{ color: '#00ff99', marginBottom: '1rem' }}>For Researchers</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Submit findings, gain recognition and earn reputation by contributing security insights and vulnerabilities.
          </p>
          <button className="cta-button" onClick={() => (window.location.href = '/proposals')}>
            Join as a Researcher
          </button>
        </div>

        <div
          style={{
            background: '#0f141a',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '280px',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(0,255,153,0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px'
          }}
        >
          <h3 style={{ color: '#00ff99', marginBottom: '1rem' }}>For Companies</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Companies gain access to critical insights, preventing breaches and improving their products.
          </p>
          <button className="cta-button" onClick={() => (window.location.href = '/company')}>
            Join as a Company
          </button>
        </div>
      </div>

    
      <div style={{ marginTop: '10rem', marginBottom: '0' }}></div>

      <div
        style={{
          background: '#0f141a',
          padding: '3rem 2rem 3rem 2rem',
          textAlign: 'center',
          width: '100vw'
        }}
      >
        <h2 style={{ color: '#00ff99', fontSize: '2rem', margin: 0 }}>
          💡 Together we build safer technology.
        </h2>
        <p
          style={{
            maxWidth: '700px',
            margin: '1rem auto 0 auto',
            lineHeight: '1.6',
            fontSize: '1.2rem',
            color: '#ccc'
          }}
        >
          Your findings protect communities. Your insights empower the future.
        </p>
      </div>


    </div>
  );
}