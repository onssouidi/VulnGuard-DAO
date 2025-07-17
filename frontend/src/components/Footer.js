// src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '1rem 0 0.5rem 0',
        textAlign: 'center',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '2rem'
      }}
    >
      <hr
        style={{
          border: 'none',
          borderTop: '2px solid rgba(0,255,153,0.5)',
          width: '100%',
          margin: '0 0 1rem 0',
          alignSelf: 'stretch'
        }}
      />
      <a
        href="/support"
        style={{
          color: '#00ff99',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        💬 Get Support
      </a>
      <p
        style={{
          color: '#00ff99',
          fontSize: '0.9rem',
          margin: 0
        }}
      >
        © 2025 VulnDAO. All rights reserved.
      </p>
    </footer>
  );
}