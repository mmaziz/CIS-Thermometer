import React from 'react';
import { DollarSign, Target, AlertCircle, Award, TrendingUp } from 'lucide-react';

export const StatsGrid = ({ raisedAmount, targetGoal, milestones, currencySymbol = '$' }) => {
  const remaining = Math.max(0, targetGoal - raisedAmount);
  const percentage = Math.min(100, Math.round((raisedAmount / targetGoal) * 100));
  const unlockedCount = milestones.filter(m => raisedAmount >= m.amount).length;

  return (
    <div className="stats-grid">
      
      {/* Total Raised */}
      <div className="stat-card">
        <div className="stat-label" style={{ color: '#34d399' }}>
          <TrendingUp style={{ width: 16, height: 16 }} /> Total Raised
        </div>
        <div className="stat-value">{currencySymbol}{raisedAmount.toLocaleString()}</div>
        <div className="stat-subtext">Progress: {percentage}% Funded</div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>

      {/* Deficit Goal */}
      <div className="stat-card">
        <div className="stat-label" style={{ color: '#60a5fa' }}>
          <Target style={{ width: 16, height: 16 }} /> Camp Deficit Goal
        </div>
        <div className="stat-value">{currencySymbol}{targetGoal.toLocaleString()}</div>
        <div className="stat-subtext">Fully sponsors 50 student ambassadors</div>
      </div>

      {/* Remaining Gap */}
      <div className="stat-card" style={{ borderColor: 'rgba(244, 63, 94, 0.3)' }}>
        <div className="stat-label" style={{ color: '#f87171' }}>
          <AlertCircle style={{ width: 16, height: 16 }} /> Remaining Gap
        </div>
        <div className="stat-value" style={{ color: '#fca5a5' }}>
          {currencySymbol}{remaining.toLocaleString()}
        </div>
        <div className="stat-subtext" style={{ color: '#f87171' }}>
          {remaining === 0 ? '🎉 Deficit completely eliminated!' : `Need ${currencySymbol}${remaining.toLocaleString()} to reach 100%`}
        </div>
      </div>

      {/* Levels Unlocked */}
      <div className="stat-card" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
        <div className="stat-label" style={{ color: '#a78bfa' }}>
          <Award style={{ width: 16, height: 16 }} /> Levels Unlocked
        </div>
        <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span>{unlockedCount}</span>
          <span style={{ fontSize: '1.1rem', color: '#64748b' }}>/ {milestones.length}</span>
        </div>
        <div className="stat-subtext">
          {unlockedCount === milestones.length ? 'All 4 camp tiers unlocked!' : `Level 1 goal: ${currencySymbol}2,000`}
        </div>
      </div>

    </div>
  );
};
