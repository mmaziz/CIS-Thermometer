import React, { useState } from 'react';
import { X, Lock, CheckCircle, Sliders, Save, AlertCircle } from 'lucide-react';

const ADMIN_PASSWORD = "Maria96$";

export const CodeHelperModal = ({ 
  isOpen, 
  onClose, 
  currentRaised, 
  targetGoal, 
  onSaveAmount 
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [tempAmount, setTempAmount] = useState(currentRaised);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMsg('');
      setTempAmount(currentRaised);
    } else {
      setErrorMsg('Incorrect password. Access denied.');
    }
  };

  const handleClose = () => {
    setPasswordInput('');
    setIsAuthenticated(false);
    setErrorMsg('');
    onClose();
  };

  const handleSave = () => {
    onSaveAmount(tempAmount);
    handleClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog" style={{ maxWidth: '540px' }}>
        
        {/* Close Button */}
        <button onClick={handleClose} className="modal-close-btn">
          <X style={{ width: 18, height: 18 }} />
        </button>

        {!isAuthenticated ? (
          /* PASSWORD PROMPT SCREEN */
          <form onSubmit={handlePasswordSubmit} style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.4rem', borderRadius: '0.5rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}>
                <Lock style={{ width: 18, height: 18 }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>
                Admin Authentication
              </h2>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Enter the administrator password to unlock editing the raised amount.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '0.75rem', 
                  background: '#07090e', 
                  border: errorMsg ? '1px solid #f87171' : '1px solid var(--border-subtle)', 
                  color: '#ffffff', 
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              {errorMsg && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f87171', fontSize: '0.78rem', marginTop: '0.4rem', fontWeight: 600 }}>
                  <AlertCircle style={{ width: 14, height: 14 }} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={handleClose} 
                className="btn-secondary" 
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-emerald" 
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.4rem' }}
              >
                Unlock
              </button>
            </div>
          </form>
        ) : (
          /* UNLOCKED: INTERACTIVE SLIDER OPTION ONLY */
          <div style={{ padding: '0.5rem 0' }}>
            
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.6) 100%)', 
              padding: '1.5rem', 
              borderRadius: '1.25rem', 
              border: '1px solid rgba(99, 102, 241, 0.45)',
              marginBottom: '1.5rem' 
            }}>
              
              {/* Slider Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                <Sliders style={{ width: 16, height: 16 }} />
                <span>Interactive Thermometer Preview Tool</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                Drag the slider below to test and preview how the liquid mercury height looks at any dollar total before saving your code:
              </p>

              {/* Amount Display */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace', marginBottom: '0.75rem' }}>
                <span style={{ color: '#94a3b8' }}>Preview Raised Amount:</span>
                <span style={{ color: '#34d399', fontSize: '1.4rem', fontWeight: 900 }}>${tempAmount.toLocaleString()}</span>
              </div>

              {/* Slider Input */}
              <input 
                type="range" 
                min="0" 
                max={targetGoal} 
                step="250"
                value={tempAmount}
                onChange={(e) => setTempAmount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer', height: '8px' }}
              />

              {/* Ticks */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace', marginTop: '0.6rem' }}>
                <span>$0</span>
                <span>$2,000</span>
                <span>$4,000</span>
                <span>$6,000</span>
                <span>$8,000</span>
              </div>

            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                onClick={handleClose} 
                className="btn-secondary" 
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="btn-emerald" 
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}
              >
                <Save style={{ width: 16, height: 16 }} />
                <span>Save Amount</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
