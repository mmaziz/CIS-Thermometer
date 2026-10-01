import React from 'react';

export const Header = ({ config, raisedAmount, targetGoal }) => {
  const remaining = Math.max(0, targetGoal - raisedAmount);

  return (
    <header className="minimal-header">
      <h1 className="minimal-title">{config.campaignTitle}</h1>
      {config.campaignSubtitle && <p className="minimal-subtitle">{config.campaignSubtitle}</p>}

      <div className="minimal-stats">
        <span>Raised: <strong style={{ color: '#34d399' }}>${raisedAmount.toLocaleString()}</strong></span>
        <span style={{ color: '#64748b' }}>|</span>
        <span>Goal: <strong style={{ color: '#ffffff' }}>${targetGoal.toLocaleString()}</strong></span>
        <span style={{ color: '#64748b' }}>|</span>
        <span>Deficit Remaining: <strong style={{ color: '#f87171' }}>${remaining.toLocaleString()}</strong></span>
      </div>
    </header>
  );
};
