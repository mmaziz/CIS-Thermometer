import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bus, 
  Utensils, 
  Trophy, 
  CheckCircle2, 
  Lock, 
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Sparkles: Sparkles,
  Bus: Bus,
  Utensils: Utensils,
  Trophy: Trophy
};

export const Thermometer = ({ raisedAmount, targetGoal, milestones }) => {
  const [animatedHeight, setAnimatedHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const percentage = Math.min(100, Math.max(0, (raisedAmount / targetGoal) * 100));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeight(percentage);
    }, 100);

    if (percentage >= 100) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    return () => clearTimeout(timer);
  }, [percentage]);

  const tubeHeight = isMobile ? 380 : 480;
  const markerOffset = isMobile ? 14 : 20;

  return (
    <div className="thermo-center-card">
      
      {/* Sleek Top Tag */}
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.4rem', 
        padding: '0.4rem 1.15rem', 
        borderRadius: '9999px', 
        background: 'rgba(6, 182, 212, 0.12)', 
        color: '#38bdf8', 
        border: '1px solid rgba(6, 182, 212, 0.3)', 
        fontSize: isMobile ? '0.72rem' : '0.8rem', 
        fontWeight: 800, 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        marginBottom: isMobile ? '1.25rem' : '2rem' 
      }}>
        <Flame style={{ width: 14, height: 14, color: '#38bdf8' }} />
        <span>Live Progress Thermometer</span>
      </div>

      {/* Main Centered Thermometer */}
      <div className="center-thermo-wrapper" style={{ height: `${tubeHeight}px` }}>
        
        {/* Center Glass Tube */}
        <div className="center-glass-tube">
          
          {/* Tick lines inside glass tube */}
          {milestones.map((m) => {
            const markRatio = m.amount / targetGoal;
            return (
              <div 
                key={m.id}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: m.amount === targetGoal ? 'calc(100% - 2px)' : `${markRatio * 100}%`,
                  borderBottom: m.amount === targetGoal ? 'none' : '2px dashed rgba(255, 255, 255, 0.35)',
                  zIndex: 10
                }}
              ></div>
            );
          })}

          {/* Mercury Fill */}
          <div 
            className="center-liquid-fill"
            style={{ height: `${animatedHeight}%` }}
          ></div>
        </div>

        {/* Base Bulb */}
        <div className="center-bulb">
          <div className="center-bulb-amount">${raisedAmount.toLocaleString()}</div>
          <div className="center-bulb-label">{percentage.toFixed(0)}% Funded</div>
        </div>

        {/* ATTACHED DOLLAR AMOUNT BADGES */}
        {milestones.map((m, index) => {
          const markRatio = m.amount / targetGoal; // 0.25, 0.5, 0.75, 1.0
          const isUnlocked = raisedAmount >= m.amount;
          const isCurrentTarget = !isUnlocked && milestones.find(item => raisedAmount < item.amount)?.id === m.id;
          const isGoal = m.amount === targetGoal;
          const IconComponent = ICON_MAP[m.iconName] || (isGoal ? Trophy : Sparkles);

          const isLeft = index % 2 === 1;

          // Calculate exact pixel bottom position
          const bottomPx = (tubeHeight * markRatio) - markerOffset;

          return (
            <div 
              key={m.id}
              className={isLeft ? "level-marker-left" : "level-marker-right"}
              style={{ bottom: `${bottomPx}px` }}
            >
              {/* Left Side */}
              {isLeft ? (
                <>
                  <div 
                    className={`marker-badge ${isUnlocked ? 'unlocked' : ''}`}
                    style={{
                      borderColor: isGoal ? 'rgba(234, 179, 8, 0.75)' : isCurrentTarget ? '#f59e0b' : undefined,
                      boxShadow: isGoal ? '0 0 20px rgba(234, 179, 8, 0.4)' : isCurrentTarget ? '0 0 15px rgba(245, 158, 11, 0.4)' : undefined,
                      background: isGoal ? 'rgba(113, 63, 18, 0.5)' : undefined
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.3rem' : '0.5rem' }}>
                      <IconComponent style={{ width: isMobile ? 14 : 18, height: isMobile ? 14 : 18, color: isGoal ? '#fde047' : isUnlocked ? '#34d399' : isCurrentTarget ? '#fbbf24' : '#94a3b8' }} />
                      <div className="marker-amount" style={{ color: isGoal ? '#fef08a' : '#ffffff' }}>
                        ${m.amount.toLocaleString()} {isGoal && <span style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', marginLeft: '0.15rem' }}>GOAL</span>}
                      </div>
                      {isUnlocked ? (
                        <CheckCircle2 style={{ width: isMobile ? 13 : 15, height: isMobile ? 13 : 15, color: '#34d399' }} />
                      ) : (
                        <Lock style={{ width: isMobile ? 11 : 13, height: isMobile ? 11 : 13, color: '#64748b' }} />
                      )}
                    </div>
                  </div>
                  <div className="marker-line" style={{ background: isGoal ? 'rgba(234, 179, 8, 0.8)' : undefined }}></div>
                </>
              ) : (
                /* Right Side */
                <>
                  <div className="marker-line" style={{ background: isGoal ? 'rgba(234, 179, 8, 0.8)' : undefined }}></div>
                  <div 
                    className={`marker-badge ${isUnlocked ? 'unlocked' : ''}`}
                    style={{
                      borderColor: isGoal ? 'rgba(234, 179, 8, 0.75)' : isCurrentTarget ? '#f59e0b' : undefined,
                      boxShadow: isGoal ? '0 0 20px rgba(234, 179, 8, 0.4)' : isCurrentTarget ? '0 0 15px rgba(245, 158, 11, 0.4)' : undefined,
                      background: isGoal ? 'rgba(113, 63, 18, 0.5)' : undefined
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.3rem' : '0.5rem' }}>
                      {isUnlocked ? (
                        <CheckCircle2 style={{ width: isMobile ? 13 : 15, height: isMobile ? 13 : 15, color: '#34d399' }} />
                      ) : (
                        <Lock style={{ width: isMobile ? 11 : 13, height: isMobile ? 11 : 13, color: '#64748b' }} />
                      )}
                      <div className="marker-amount" style={{ color: isGoal ? '#fef08a' : '#ffffff' }}>
                        ${m.amount.toLocaleString()} {isGoal && <span style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', marginLeft: '0.15rem' }}>GOAL</span>}
                      </div>
                      <IconComponent style={{ width: isMobile ? 14 : 18, height: isMobile ? 14 : 18, color: isGoal ? '#fde047' : isUnlocked ? '#34d399' : isCurrentTarget ? '#fbbf24' : '#94a3b8' }} />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}

      </div>

    </div>
  );
};
