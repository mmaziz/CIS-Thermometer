import React, { useState } from 'react';
import { X, Copy, Check, Zap, Send, DollarSign, CreditCard, Building, ExternalLink, HeartHandshake, AlertCircle } from 'lucide-react';

const ICON_MAP = {
  Zap: Zap,
  Send: Send,
  DollarSign: DollarSign,
  CreditCard: CreditCard,
  Building: Building
};

export const DonateModal = ({ isOpen, onClose, paymentMethods, paymentNote }) => {
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog" style={{ maxWidth: '580px' }}>
        
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn">
          <X style={{ width: 18, height: 18 }} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.5rem' }}>
            <HeartHandshake style={{ width: 14, height: 14 }} /> Online Payment Available *
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff' }}>
            Support CIS Ambassadors Camp
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.35)', color: '#fde047', padding: '0.6rem 0.85rem', borderRadius: '0.75rem', fontSize: '0.82rem', fontWeight: 700, marginTop: '0.75rem' }}>
            <AlertCircle style={{ width: 16, height: 16, shrink: 0 }} />
            <span>{paymentNote || "Please make sure to leave your child's name in the comment"}</span>
          </div>
        </div>

        {/* Payment Methods List matching screenshot */}
        <div>
          {paymentMethods.map((method) => {
            const IconComp = ICON_MAP[method.icon] || Zap;
            const isCopied = copiedId === method.id;
            const isSecCopied = copiedId === `${method.id}-sec`;

            return (
              <div key={method.id} className="payment-method-row">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ padding: '0.65rem', borderRadius: '0.5rem', background: `${method.color}25`, border: `1px solid ${method.color}50`, color: method.color, flexShrink: 0 }}>
                    <IconComp style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{method.name}</h3>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1', margin: '0.15rem 0' }}>{method.note}</div>
                    
                    <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700, marginTop: '0.25rem' }}>
                      {method.handle}
                    </div>

                    {method.secondaryHandle && (
                      <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#a7f3d0', fontWeight: 600, marginTop: '0.15rem' }}>
                        Zelle / Email: {method.secondaryHandle}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignSelf: 'center' }}>
                  {method.url ? (
                    <>
                      <a href={method.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}>
                        <span>Open Paypal.me</span>
                        <ExternalLink style={{ width: 12, height: 12 }} />
                      </a>
                      {method.secondaryHandle && (
                        <button
                          onClick={() => handleCopy(`${method.id}-sec`, method.secondaryHandle)}
                          className="btn-secondary"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                        >
                          {isSecCopied ? (
                            <>
                              <Check style={{ width: 12, height: 12, color: '#34d399' }} />
                              <span>Copied Email!</span>
                            </>
                          ) : (
                            <>
                              <Copy style={{ width: 12, height: 12 }} />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : method.id === 'venmo' ? (
                    <button
                      onClick={() => handleCopy(method.id, method.handle)}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      {isCopied ? (
                        <>
                          <Check style={{ width: 13, height: 13, color: '#34d399' }} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy style={{ width: 13, height: 13 }} />
                          <span>Copy Handle</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      In Person
                    </span>
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
