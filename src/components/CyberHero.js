import React from 'react';
import { motion } from 'framer-motion';
import '../styles.css';

const CyberHero = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title glitch" data-text="HISHIKAWA YUKI">HISHIKAWA YUKI</h1>
                </motion.div>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    &gt; AI-NATIVE CREATOR // VIBES CODING_
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        onClick={() => document.getElementById('works').scrollIntoView({ behavior: 'smooth' })}
                        style={{ cursor: 'pointer', color: '#ffffff' }}
                    >
                        {/* White Downward Triangle */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6,8 18,8 12,18" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CyberHero;
