import React from 'react';
import { Sparkles, Bus, Utensils, Trophy, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Bus: Bus,
  Utensils: Utensils,
  Trophy: Trophy
};

export const MilestonesSection = ({ milestones, raisedAmount, targetGoal, onOpenDonate }) => {
  return (
    <section style={{ margin: '3rem 0', paddingTop: '2.5rem', borderTop: '1px solid var(--border-subtle)' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge-pill badge-cyan" style={{ marginBottom: '0.5rem' }}>
          Camp Provisions Breakdown
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
          What Each Level Unlocks
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          As contributions come in, each dollar milestone reached directly unlocks crucial provisions for the student ambassadors.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {milestones.map((m) => {
          const isUnlocked = raisedAmount >= m.amount;
          const percentage = Math.round((m.amount / targetGoal) * 100);
          const IconComponent = ICON_MAP[m.iconName] || Sparkles;

          return (
            <div 
              key={m.id}
              className="glass-card"
              style={{
                borderColor: isUnlocked ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)',
                background: isUnlocked ? 'rgba(6, 78, 59, 0.2)' : 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', itemsAlign: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="milestone-icon-box" style={{ width: '2.75rem', height: '2.75rem' }}>
                      <IconComponent style={{ width: 22, height: 22 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                        Level {m.levelNumber} Milestone ({percentage}%)
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
                        ${m.amount.toLocaleString()} Goal
                      </div>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <span className="badge-pill badge-emerald">
                      <CheckCircle2 style={{ width: 12, height: 12 }} /> UNLOCKED
                    </span>
                  ) : (
                    <span className="badge-pill" style={{ background: '#1e293b', color: '#94a3b8' }}>
                      <Lock style={{ width: 10, height: 10 }} /> LOCKED
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.4rem' }}>
                  {m.subtitle}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {m.description}
                </div>

                <div className="milestone-checklist" style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Provisions Covered:
                  </div>
                  <ul>
                    {m.itemsUnlocked.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {!isUnlocked && (
                <button 
                  onClick={onOpenDonate}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.8rem', padding: '0.65rem 1rem', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' }}
                >
                  <span>Support Level {m.levelNumber} Goal</span>
                  <ArrowUpRight style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
