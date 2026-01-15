import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Globe, Activity, Mail, MapPin } from 'lucide-react';
import './App.css';

// --- Clean Code: Sub-components for better modularity ---

const ScanlineEffect = () => <div className="scanlines"></div>;

const ProfileHeader = ({ alias, accountCount }) => {
  // Logika oceny ekspozycji
  const getExposureLevel = (count) => {
    if (count === 0) return { label: 'MINIMAL', color: '#00fbff' };
    if (count <= 2) return { label: 'LOW', color: '#00fbff' };
    if (count <= 4) return { label: 'MODERATE', color: '#ffaa00' };
    return { label: 'HIGH', color: '#ff4444' };
  };

  const exposure = getExposureLevel(accountCount);

  return (
    <div className="profile-header" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
      <div className="avatar-box" style={{ border: '1px solid #00fbff', padding: '10px' }}>
        <User color="#00fbff" size={40}/>
      </div>
      <div>
        <h2 style={{ margin: 0, letterSpacing: '2px' }}>{alias.toUpperCase()}</h2>
        <div style={{
          color: exposure.color, 
          fontSize: '0.75rem', 
          fontWeight: 'bold',
          marginTop: '5px',
          letterSpacing: '1px'
        }}>
          DIGITAL_EXPOSURE: {exposure.label}
        </div>
      </div>
    </div>
  );
};

const InterceptedData = ({ email, location }) => (
  <div className="intercept-box" style={{ marginBottom: '20px', padding: '10px', background: 'rgba(0, 251, 255, 0.05)', border: '1px dashed rgba(0, 251, 255, 0.3)' }}>
    <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
      <span className="label" style={{ color: '#00fbff', fontSize: '0.8rem' }}><Mail size={12}/> INTERCEPTED_EMAIL:</span>
      <span style={{ color: email ? '#00fbff' : '#666', fontSize: '0.9rem' }}>{email || "PRIVATE_ENCRYPTED"}</span>
    </div>
    <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
      <span className="label" style={{ color: '#00fbff', fontSize: '0.8rem' }}><MapPin size={12}/> GEOLOCATION_NODE:</span>
      <span style={{ fontSize: '0.9rem' }}>{location.toUpperCase()}</span>
    </div>
  </div>
);

// --- Main Application Component ---

function App() {
  const [username, setUsername] = useState('');
  const [subjectData, setSubjectData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const performDiscovery = async () => {
    if (!username) return;
    setIsScanning(true);
    setSubjectData(null);

    const API_URL = window.location.port === '3000' 
      ? 'http://127.0.0.1:8000' 
      : 'https://ctos-profiler-osint.onrender.com';

    try {
      const response = await axios.get(`${API_URL}/api/profile/${username}/`);
      setSubjectData(response.data);
    } catch (error) {
      alert("SYSTEM ERROR: ctOS NODE UNREACHABLE");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="app-container">
      <ScanlineEffect />
      
      <section className="search-terminal">
        <header className="terminal-header" style={{ color: '#00fbff', fontSize: '0.6rem', marginBottom: '8px' }}>
          <Activity size={10} /> ctOS_V3.5_MOBILE_PROFILER
        </header>
        <input 
          placeholder="ENTER SUBJECT ALIAS..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && performDiscovery()}
        />
        <button onClick={performDiscovery} disabled={isScanning} className="scan-button">
          {isScanning ? "CHECKING NETWORKS..." : "[ INITIATE GLOBAL SCAN ]"}
        </button>
      </section>

      <AnimatePresence>
        {subjectData && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="profiler-card"
          >
            <div className="status-header" style={{ background: '#00fbff', color: 'black', padding: '2px 10px', fontSize: '0.7rem', display: 'inline-block', marginBottom: '15px' }}>
              SUBJECT_IDENTIFIED
            </div>

            <ProfileHeader 
              alias={subjectData.alias} 
              accountCount={subjectData.found_accounts.length} 
            />
            
            <InterceptedData 
              email={subjectData.intercepted_email} 
              location={subjectData.location} 
            />

            <div className="node-list">
              <div className="label" style={{ color: '#00fbff', fontSize: '0.7rem', marginBottom: '10px' }}>
                <Globe size={12} /> ACTIVE_DATA_NODES:
              </div>
              {subjectData.found_accounts.map((node, index) => (
                <div key={index} className="data-row node-item" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 251, 255, 0.1)', padding: '8px 0' }}>
                  <span>{node.platform.toUpperCase()}</span>
                  <a href={node.url} target="_blank" rel="noreferrer" className="link-btn" style={{ color: 'white', textDecoration: 'none' }}>
                    [ ACCESS_NODE ]
                  </a>
                </div>
              ))}
            </div>

            <footer style={{ fontSize: '0.5rem', marginTop: '20px', opacity: 0.3, textAlign: 'right' }}>
              ctOS_PROFILER_PROTOCOL_BY_DEDSEC
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;