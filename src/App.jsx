import React, { useState, useEffect } from 'react';
import { fundraisingConfig } from './config/fundraising';
import { Header } from './components/Header';
import { Thermometer } from './components/Thermometer';
import { DonateModal } from './components/DonateModal';
import { CodeHelperModal } from './components/CodeHelperModal';
import { HeartHandshake, Lock, Sliders, RotateCcw, CloudCheck, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'cis_raised_amount';
const CLOUD_OBJECT_ID = 'ff808181a09d98f701a0f5b8830052d7';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

export function App() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isCodeHelperOpen, setIsCodeHelperOpen] = useState(false);
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);

  // Load saved raised amount from localStorage initially
  const [currentRaised, setCurrentRaised] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = Number(saved);
      if (!isNaN(parsed)) return parsed;
    }
    return fundraisingConfig.raisedAmount;
  });

  // Fetch live global amount from cloud API for all devices
  const fetchCloudAmount = async () => {
    try {
      setIsLoadingCloud(true);
      const res = await fetch(CLOUD_API_URL);
      if (res.ok) {
        const json = await res.json();
        if (json?.data?.amount !== undefined) {
          const cloudNum = Number(json.data.amount);
          if (!isNaN(cloudNum)) {
            setCurrentRaised(cloudNum);
            localStorage.setItem(STORAGE_KEY, cloudNum.toString());
          }
        }
      }
    } catch (err) {
      console.warn('Cloud sync offline fallback to local state:', err);
    } finally {
      setIsLoadingCloud(false);
    }
  };

  useEffect(() => {
    fetchCloudAmount();

    // Poll global cloud amount every 15 seconds so all connected devices update live
    const interval = setInterval(fetchCloudAmount, 15000);
    return () => clearInterval(interval);
  }, []);

  // Save new raised amount globally to cloud API AND localStorage
  const handleSaveAmount = async (newAmount) => {
    setCurrentRaised(newAmount);
    localStorage.setItem(STORAGE_KEY, newAmount.toString());

    try {
      setIsLoadingCloud(true);
      await fetch(CLOUD_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'cis_raised_amount',
          data: { amount: newAmount }
        })
      });
    } catch (err) {
      console.warn('Error saving to cloud API:', err);
    } finally {
      setIsLoadingCloud(false);
    }
  };

  const handleResetAmount = () => {
    handleSaveAmount(0);
  };

  return (
    <div className="centered-app">
      
      {/* Live Preview Active Banner */}
      {currentRaised > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(16, 185, 129, 0.95)', color: '#ffffff', padding: '0.4rem 1rem', fontSize: '0.78rem', fontWeight: 800, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
          <CloudCheck style={{ width: 15, height: 15 }} />
          <span>Global Live Amount: <strong>${currentRaised.toLocaleString()}</strong></span>
          <button 
            onClick={handleResetAmount}
            style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.2rem 0.6rem', borderRadius: '0.3rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: '0.5rem' }}
          >
            <RotateCcw style={{ width: 12, height: 12 }} /> Reset to $0
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
        paymentNote={fundraisingConfig.paymentNote}
      />

      {/* Developer Code Helper Modal */}
      <CodeHelperModal 
        isOpen={isCodeHelperOpen}
        onClose={() => setIsCodeHelperOpen(false)}
        currentRaised={currentRaised}
        targetGoal={fundraisingConfig.targetGoal}
        onSaveAmount={handleSaveAmount}
      />

    </div>
  );
}

export default App;
