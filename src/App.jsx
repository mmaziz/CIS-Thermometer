import React, { useState } from 'react';
import { fundraisingConfig } from './config/fundraising';
import { Header } from './components/Header';
import { Thermometer } from './components/Thermometer';
import { DonateModal } from './components/DonateModal';
import { CodeHelperModal } from './components/CodeHelperModal';
import { HeartHandshake, Lock, Sliders, RotateCcw } from 'lucide-react';

export function App() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isCodeHelperOpen, setIsCodeHelperOpen] = useState(false);
  
  const [currentRaised, setCurrentRaised] = useState(fundraisingConfig.raisedAmount);
  const isCustomPreview = currentRaised !== fundraisingConfig.raisedAmount;

  return (
    <div className="centered-app">
      
      {/* Live Preview Active Banner */}
      {isCustomPreview && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(245, 158, 11, 0.9)', color: '#0f172a', padding: '0.4rem 1rem', fontSize: '0.78rem', fontWeight: 800, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Sliders style={{ width: 14, height: 14 }} />
          <span>Interactive Amount Active: Showing <strong>${currentRaised.toLocaleString()}</strong> raised</span>
          <button 
            onClick={() => setCurrentRaised(fundraisingConfig.raisedAmount)}
            style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.2rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: '0.5rem' }}
          >
            <RotateCcw style={{ width: 12, height: 12 }} /> Reset to Code (${fundraisingConfig.raisedAmount.toLocaleString()})
          </button>
        </div>
      )}

      {/* Top Header */}
      <Header 
        config={fundraisingConfig}
        raisedAmount={currentRaised}
        targetGoal={fundraisingConfig.targetGoal}
      />

      {/* Main Centered Thermometer Showcase */}
      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Thermometer 
          raisedAmount={currentRaised}
          targetGoal={fundraisingConfig.targetGoal}
          milestones={fundraisingConfig.milestones}
        />
      </main>

      {/* Bottom Action Bar */}
      <footer style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <button 
          onClick={() => setIsDonateOpen(true)}
          className="btn-emerald"
        >
          <HeartHandshake style={{ width: 20, height: 20 }} />
          <span>Support The Camp</span>
        </button>

        <button 
          onClick={() => setIsCodeHelperOpen(true)}
          className="btn-code"
        >
          <Lock style={{ width: 15, height: 15, color: '#fbbf24' }} />
          <span>Edit Amount</span>
        </button>
      </footer>

      {/* Donation Modal */}
      <DonateModal 
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        paymentMethods={fundraisingConfig.paymentMethods}
      />

      {/* Developer Code Helper Modal */}
      <CodeHelperModal 
        isOpen={isCodeHelperOpen}
        onClose={() => setIsCodeHelperOpen(false)}
        currentRaised={currentRaised}
        targetGoal={fundraisingConfig.targetGoal}
        onSaveAmount={(newAmount) => setCurrentRaised(newAmount)}
      />

    </div>
  );
}

export default App;
