import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, ShieldAlert, Camera } from 'lucide-react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  // Start Camera for "Aiden Pearce" Look
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) { console.log("Camera blocked"); }
    }
    startCamera();
  }, []);

  const initiateScan = async () => {
    if (!query) return;
    setLoading(true);
    setData(null);
    try {
      const API = window.location.port === '3000' ? 'http://127.0.0.1:8000' : 'https://ctos-profiler-osint.onrender.com';
      const res = await axios.get(`${API}/api/profile/${query}/`);
      setData(res.data);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    } catch (e) { alert("CONNECTION_LOST: ctOS NODE_OFFLINE"); }
    setLoading(false);
  };

  return (
    <div className="wd-container">
      {/* Real-time Camera Background */}
      <video ref={videoRef} autoPlay playsInline className="camera-bg" />
      <div className="overlay-grid" />

      {/* Input Terminal */}
      <div className="wd-terminal">
        <input 
          placeholder="[ SEARCH_TARGET ]" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && initiateScan()}
        />
        <button onClick={initiateScan} className={loading ? "scanning" : ""}>
          {loading ? "PROFILING..." : "PROFILER_INIT"}
        </button>
      </div>

      {/* WD1 Profiler Card */}
      <AnimatePresence>
        {data && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="wd-card">
            <div className="wd-header">
              <span>PERSON_OF_INTEREST</span>
              <span className="id-tag">ID: {Math.floor(Math.random()*9999)}</span>
            </div>
            
            <div className="wd-body">
              <div className="avatar-frame">
                {data.avatar_url ? <img src={data.avatar_url} alt="target" /> : <div className="no-img">NO_VISUAL_DATA</div>}
                <div className="scanline-v" />
              </div>

              <div className="info-row">
                <span className="label">SUBJECT:</span>
                <span className="value">{data.alias.toUpperCase()}</span>
              </div>

              <div className="info-row">
                <span className="label">PROBABLE_CAUSE:</span>
                <span className="value cyan">{data.probability}% MATCH</span>
              </div>

              <div className="probability-bar">
                <motion.div initial={{width: 0}} animate={{width: `${data.probability}%`}} className="bar-fill" />
              </div>

              <div className="node-list">
                <span className="label">DETECTED_NODES:</span>
                {data.found_accounts?.map((node, i) => (
                  <div key={i} className="node-item">{node.platform} >> LINKED</div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;