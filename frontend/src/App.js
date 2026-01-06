import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Globe, Activity, Mail, MapPin } from 'lucide-react';
import './App.css';

function App() {
  // 1. STANY APLIKACJI
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. FUNKCJA SKANUJĄCA
  const handleScan = async () => {
    if (!username) return;
    setLoading(true);
    setData(null);
    try {
      // Wywołanie Twojego API w Django
      const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);
      setData(response.data);
    } catch (error) {
      alert("ctOS CONNECTION ERROR: SERVER_UNREACHABLE");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Efekt pasów na ekranie */}
      <div className="scanlines"></div>
      
      {/* OKNO WYSZUKIWANIA (Terminal) */}
      <div className="search-terminal">
        <div style={{color: '#00fbff', fontSize: '0.6rem', marginBottom: '8px', letterSpacing: '1px'}}>
          <Activity size={10} style={{marginRight: '5px'}} />
          ctOS_V3.5_PROFILER_SYSTEM_READY
        </div>
        <input 
          placeholder="ENTER SUBJECT ALIAS..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleScan()}
        />
        <button onClick={handleScan} className="scan-button">
          {loading ? "SEARCHING ENCRYPTED NODES..." : "[ INITIATE GLOBAL SCAN ]"}
        </button>
      </div>

      {/* PROFILER HUD (Wyniki skanowania) */}
      <AnimatePresence>
        {data && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="profiler-card"
          >
            {/* Nagłówek HUD */}
            <div className="status-header">SUBJECT_IDENTIFIED</div>
            
            <div style={{display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px'}}>
              <div className="avatar-box">
                <User color="#00fbff" size={40}/>
              </div>
              <div>
                <h2 style={{margin: 0, letterSpacing: '2px'}}>{data.alias.toUpperCase()}</h2>
                
                {/* DYNAMICZNY THREAT LEVEL */}
                <div style={{
                  color: data.found_accounts.length > 3 ? '#ff4444' : '#ffaa00', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  marginTop: '5px'
                }}>
                  THREAT_LEVEL: {data.found_accounts.length > 3 ? 'CRITICAL (HIGH RISK)' : 'MODERATE (OBSERVED)'}
                </div>
              </div>
            </div>

            {/* SEKCJA PRZECHWYCONYCH DANYCH (NOWOŚĆ!) */}
            <div className="intercept-box" style={{marginBottom: '20px', padding: '10px', background: 'rgba(0, 251, 255, 0.05)', border: '1px dashed var(--ctos-border)'}}>
               <div className="data-row">
                 <span className="label"><Mail size={12} style={{marginRight: '5px'}}/> INTERCEPTED_EMAIL:</span>
                 <span style={{color: data.intercepted_email ? '#00fbff' : '#666', fontSize: '0.9rem'}}>
                    {data.intercepted_email || "PRIVATE_OR_NOT_FOUND"}
                 </span>
               </div>
               <div className="data-row">
                 <span className="label"><MapPin size={12} style={{marginRight: '5px'}}/> GEOLOCATION_NODE:</span>
                 <span style={{fontSize: '0.9rem'}}>{data.location.toUpperCase()}</span>
               </div>
            </div>

            {/* LISTA WĘZŁÓW SIECIOWYCH (Social Media) */}
            <div className="data-section">
              <div className="label" style={{marginBottom: '10px', fontSize: '0.7rem'}}>
                <Globe size={12} style={{marginRight: '5px'}} /> 
                ACTIVE_DATA_NODES_FOUND:
              </div>
              
              {data.found_accounts.length > 0 ? (
                data.found_accounts.map((acc, i) => (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="data-row"
                  >
                    <span className="platform-name">{acc.platform.toUpperCase()}</span>
                    <a href={acc.url} target="_blank" rel="noreferrer" className="link-btn">
                      [ ACCESS_NODE ]
                    </a>
                  </motion.div>
                ))
              ) : (
                <div className="data-row" style={{color: 'red'}}>NO_DIGITAL_FOOTPRINT_DETECTED</div>
              )}
            </div>

            {/* Stopka techniczna */}
            <div style={{fontSize: '0.5rem', marginTop: '20px', opacity: 0.3, textAlign: 'right', letterSpacing: '2px'}}>
              ctOS_PROFILER_PROTOCOL_BY_DEDSEC
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;