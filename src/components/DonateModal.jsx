import React, { useState } from 'react';
import { X, Copy, Check, Zap, Send, DollarSign, CreditCard, Building, ExternalLink, HeartHandshake } from 'lucide-react';

const ICON_MAP = {
  Zap: Zap,
  Send: Send,
  DollarSign: DollarSign,
  CreditCard: CreditCard,
  Building: Building
};

export const DonateModal = ({ isOpen, onClose, paymentMethods }) => {
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        
        <button onClick={onClose} className="modal-close-btn">
          <X style={{ width: 18, height: 18 }} />
        </button>

        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.5rem' }}>
            <HeartHandshake style={{ width: 14, height: 14 }} /> Direct Contribution Portal
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff' }}>
            Support CIS Ambassadors Camp
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Choose your preferred donation method below. 100% of contributions go directly toward covering the camp deficit!
          </p>
        </div>

        <div>
          {paymentMethods.map((method) => {
            const IconComp = ICON_MAP[method.icon] || Zap;
            const isCopied = copiedId === method.id;

            return (
              <div key={method.id} className="payment-method-row">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ padding: '0.65rem', borderRadius: '0.5rem', background: `${method.color}25`, border: `1px solid ${method.color}50`, color: method.color, flexShrink: 0 }}>
                    <IconComp style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{method.name}</h3>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>
                      {method.handle}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>{method.note}</div>
                  </div>
                </div>

                <div>
                  {method.url ? (
                    <a href={method.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                      <span>Donate Online</span>
                      <ExternalLink style={{ width: 12, height: 12 }} />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCopy(method.id, method.handle)}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      {isCopied ? (
                        <>
                          <Check style={{ width: 14, height: 14, color: '#34d399' }} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy style={{ width: 14, height: 14 }} />
                          <span>Copy Handle</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
