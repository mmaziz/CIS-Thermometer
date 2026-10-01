import React from 'react';
import { Shield, Code2, Heart } from 'lucide-react';

export const Footer = ({ config, onOpenCodeHelper }) => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#60a5fa' }}>
            <Shield style={{ width: 16, height: 16 }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{config.organizationName}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{config.campName} • Deficit Cover Initiative</div>
          </div>
        </div>

        {/* Middle */}
        <div style={{ display: 'flex', items: 'center', gap: '0.35rem' }}>
          <span>Built with</span>
          <Heart style={{ width: 14, height: 14, color: '#f43f5e', fill: '#f43f5e' }} />
          <span>for CIS Ambassadors Student Leadership</span>
        </div>

        {/* Right */}
        <button 
          onClick={onOpenCodeHelper}
          style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'monospace', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Code2 style={{ width: 14, height: 14 }} />
          <span>Edit `raisedAmount` in code</span>
        </button>

      </div>
    </footer>
  );
};
