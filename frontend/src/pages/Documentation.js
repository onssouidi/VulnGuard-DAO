import React, { useState } from 'react';

export default function Documentation() {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (value) => {
    setOpenItem(openItem === value ? null : value);
  };

  const Section = ({ value, title, children }) => (
    <div style={{ border: '1px solid #008f66', borderRadius: '8px', marginBottom: '1rem' }}>
      <div
        onClick={() => toggle(value)}
        style={{ cursor: 'pointer', padding: '1rem', background: '#1a1f24', color: '#7fffd4', fontSize: '1.2rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ transition: 'transform 0.3s' }}>{openItem === value ? '▲' : '▼'}</span>
        <span>{title}</span>
      </div>
      {openItem === value && (
        <div style={{ padding: '1rem', background: '#0f141a', color: '#ccc' }}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: '#0a0f14', color: '#e2e8f0', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#7fffd4', marginTop: '5rem', marginBottom: '5rem' }}>📘 VulnDAO Documentation</h1>

      <Section value="intro" title="VulnDAO">
        A decentralized protocol for ethical vulnerability disclosure, governed by a DAO of white‑hat researchers, aligning incentives between researchers and organizations.
      </Section>

      <Section value="vision" title="Vision">
        VulnDAO transforms vulnerability disclosure into a transparent, collaborative ecosystem. Researchers earn recognition and rewards while enterprises gain structured, timely threat intelligence—fostering mutual trust and elevating security standards industry‑wide.
      </Section>

      <Section value="architecture" title="Architecture Overview">
        <h3 style={{ color: '#00ff99', fontWeight: 'bold' }}>On‑Chain Layer</h3>
        <ul style={{ marginLeft: '1rem' }}>
          <li>Governance smart contracts for staking, voting, and reward distribution</li>
          <li>Token ledger for native VULN token staking and payments</li>
          <li>Immutable registry of approved vulnerability disclosures</li>
        </ul>
        <h3 style={{ color: '#00ff99', fontWeight: 'bold', marginTop: '1rem' }}>Off‑Chain Layer</h3>
        <ul style={{ marginLeft: '1rem' }}>
          <li>Peer‑review environment and discussion boards</li>
          <li>Submission portal for detailed exploit reports</li>
          <li>Enterprise dashboard for subscription management and report delivery</li>
        </ul>
      </Section>

      <Section value="tokenomics" title="Tokenomics">
        <p><strong>Research Rewards:</strong> 30% — Up to 3M VULN token/year for approved disclosures (DAO can vote to extend).</p>
        <p><strong>Ecosystem Growth:</strong> 20% — Grants, partnerships, hackathons decided by DAO governance.</p>
        <p><strong>Team & Advisors:</strong> 15% — Locked 1 year, vested over 2 more years.</p>
        <p><strong>Public & Strategic Sale:</strong> 15% — Funds development, audits, legal, released gradually.</p>
        <p><strong>DAO Treasury:</strong> 15% — Reserve fund for emergencies or new features.</p>
        <p><strong>Liquidity & Listings:</strong> 5% — Ensures token tradability on DEXs.</p>
        <p><strong>Staking Requirement:</strong> 1,000 VULN token to join governance.</p>
        <p><strong>Reward Pool:</strong> 15 VULN token per approved disclosure (adjusted by DAO).</p>
        <p><strong>Access Fee:</strong> Subscription: 500 VULN/month; One‑off report: variable by severity.</p>
      </Section>

      <Section value="governance" title="DAO Governance Model">
        <h3 style={{ color: '#00ff99', fontWeight: 'bold' }}>Membership & Staking</h3>
        <ul style={{ marginLeft: '1rem' }}>
          <li>Researchers stake minimum 1,000 VULN token to become voting members</li>
          <li>Higher stake and track record of approved disclosures increase voting weight</li>
        </ul>
        <h3 style={{ color: '#00ff99', fontWeight: 'bold', marginTop: '1rem' }}>Core Responsibilities</h3>
        <ul style={{ marginLeft: '1rem' }}>
          <li>Review & Approval</li>
          <li>Disclosure Scheduling</li>
          <li>Policy Updates</li>
        </ul>
      </Section>

      <Section value="workflow" title="Submission & Review Workflow">
        <ol style={{ marginLeft: '1rem' }}>
          <li>Report Submission: Upload details, POC, remediation suggestions.</li>
          <li>Preliminary Validation: Automated completeness and reproducibility checks.</li>
          <li>DAO Peer-Review: 7‑day review window, approve/revise votes.</li>
          <li>Final Approval: ≥60% approve → mint registry entry and reward researcher.</li>
          <li>Access Granting: Notify subscribers, then publish after embargo.</li>
        </ol>
      </Section>

      <Section value="dualaccess" title="Dual‑Access Model">
        <ul style={{ marginLeft: '1rem' }}>
          <li><strong>Subscription‑Based Early Access:</strong> Monthly or annual plans for enterprises.</li>
          <li><strong>One‑Time Purchase:</strong> Pay per report via on‑chain VULN token transactions.</li>
        </ul>
      </Section>

      <Section value="incentives" title="Incentives & Reputation">
        <ul style={{ marginLeft: '1rem' }}>
          <li>Staking incentives from access fees</li>
          <li>Reputation score based on approvals, accuracy, peer feedback</li>
          <li>Voting weight = staked tokens × reputation multiplier</li>
        </ul>
      </Section>

      <Section value="security" title="Security & Compliance">
        <ul style={{ marginLeft: '1rem' }}>
          <li>End‑to‑end encryption for POCs</li>
          <li>GDPR‑compliant data handling</li>
          <li>NDA smart contracts and slashing for misconduct</li>
        </ul>
      </Section>

      <Section value="roadmap" title="Roadmap">
        <ol style={{ marginLeft: '1rem' }}>
          <li>Q4 2025: Core audits, alpha with 50 pilot researchers</li>
          <li>Q1 2026: Enterprise onboarding, subscription module</li>
          <li>Q2 2026: Decentralized review UI, reputation scoring v1</li>
          <li>Q3 2026: Public registry release, DEX listing</li>
          <li>Q4 2026: Community proposals, cross‑chain integrations</li>
        </ol>
      </Section>
    </div>
  );
}