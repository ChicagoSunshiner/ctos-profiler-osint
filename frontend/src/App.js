import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Globe, Activity, Search } from 'lucide-react';
import './App.css';

function App() {
  // 1. ZMIENNE STANU (Tu React przechowuje dane)
  const [username, setUsername] = useState(''); // To, co wpisujesz w pole wyszukiwania
  const [data, setData] = useState(null);       // To, co przyjdzie z Django (lista kont)
  const [loading, setLoading] = useState(false); // Czy skanowanie trwa (żeby pokazać animację)

  // 2. FUNKCJA SKANUJĄCA (Łącznik z Pythonem)
  const handleScan = async () => {
    if (!username) return;
    setLoading(true);
    setData(null); // Czyścimy poprzednie wyniki
    try {
      // Tu uderzamy do Twojego backendu Django
      const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);
      setData(response.data);
    } catch (error) {
      alert("ctOS ERROR: UNABLE TO REACH SCANNER ENGINE");
    }
    setLoading(false);
  };

  // 3. WYGLĄD APLIKACJI (To widzi użytkownik)
  return (
    <div className="app-container">
      {/* Efekt pasów na ekranie (z CSS) */}
      <div className="scanlines"></div>
      
      {/* TERMINAL WYSZUKIWANIA (Górne okienko) */}
      <div className="search-terminal">
        <div style={{color: '#00fbff', fontSize: '0.6rem', marginBottom: '5px', letterSpacing: '1px'}}>
          <Activity size={10} style={{marginRight: '5px'}} />
          ctOS_V3.0_MOBILE_PROFILER_ACTIVE
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
          <input 
            placeholder="ENTER SUBJECT ALIAS..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()} // Skanuj po Enterze
          />
        </div>
        <button onClick={handleScan} className="scan-button">
          {loading ? "SCANNING ENCRYPTED NODES..." : "[ INITIATE GLOBAL SCAN ]"}
        </button>
      </div>

      {/* PROFILER CARD (Pojawia się tylko gdy znajdziemy dane) */}
      <AnimatePresence>
        {data && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="profiler-card"
          >
            {/* Nagłówek karty */}
            <div className="status-header">SUBJECT_MATCH_FOUND</div>
            
            <div style={{display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px'}}>
              <div className="avatar-box"><User color="#00fbff" size={40}/></div>
              <div>
                <h2 style={{margin: 0, letterSpacing: '2px'}}>{data.alias.toUpperCase()}</h2>
                
                {/* DYNAMICZNY THREAT LEVEL (Logika Watch Dogs) */}
                <div style={{
                  color: data.found_accounts.length > 3 ? '#ff4444' : '#ffaa00', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  marginTop: '5px'
                }}>
                  THREAT LEVEL: {data.found_accounts.length > 3 ? 'CRITICAL (HIGH RISK)' : 'MODERATE (OBSERVED)'}
                </div>
              </div>
            </div>

            {/* LISTA ZNALEZIONYCH KONT */}
            <div className="data-section">
              <div className="label" style={{marginBottom: '10px'}}>
                <Globe size={12} style={{marginRight: '5px'}} /> 
                INTERCEPTED_DIGITAL_FOOTPRINTS:
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
                <div className="data-row" style={{color: 'red'}}>NO_ACCOUNTS_IDENTIFIED</div>
              )}
            </div>

            {/* Stopka karty */}
            <div style={{fontSize: '0.6rem', marginTop: '20px', opacity: 0.5, textAlign: 'right'}}>
              DEDSEC_PROFILER_SYSTEM_V3
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;