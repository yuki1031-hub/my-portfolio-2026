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
                        style={{ cursor: 'pointer', color: 'var(--neon-yellow)' }}
                    >
                        {/* Pixel Arrow Icon */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ imageRendering: 'pixelated' }}>
                            <path d="M12 18L12 16L12 14L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                            <path d="M8 14L10 14L10 16L12 18L14 16L14 14L16 14" fill="currentColor" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CyberHero;
