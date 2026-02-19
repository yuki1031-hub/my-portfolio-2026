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
                >
                    <button className="btn-cyber" onClick={() => document.getElementById('works').scrollIntoView({ behavior: 'smooth' })}>
                        INITIALIZE SYSTEM
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CyberHero;
