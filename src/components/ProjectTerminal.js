import React, { useState, useEffect } from 'react';
import '../styles.css';

const ProjectTerminal = () => {
    const [logs, setLogs] = useState([
        "> INITIALIZING AI_PROTOTYPER...",
        "> CONNECTING TO NEURAL NET...",
        "> GENERATING UI COMPONENTS..."
    ]);

    useEffect(() => {
        const newLogs = [
            "> OPTIMIZING RENDERING...",
            "> DEPLOYING TO VERCEL...",
            "> SYSTEM READY.",
            "> WAITING FOR USER INPUT..."
        ];

        let delay = 1000;
        newLogs.forEach((log) => {
            setTimeout(() => {
                setLogs(prev => [...prev.slice(-4), log]);
            }, delay);
            delay += 1500;
        });
    }, []);

    return (
        <div className="retro-monitor">
            <div className="monitor-brand">AI-SYSTEMS</div>
            <div className="monitor-power"></div>

            <div className="terminal-card">
                <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span style={{ marginLeft: '10px', color: '#888', fontSize: '0.8rem' }}>AI-Powered Prototyper.exe</span>
                </div>
                <div className="terminal-body">
                    {logs.map((log, index) => (
                        <div key={index} style={{ marginBottom: '5px' }}>{log}</div>
                    ))}
                    <div className="cursor-blink">_</div>
                </div>
            </div>
            <style>{`
        .cursor-blink {
          display: inline-block;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default ProjectTerminal;
