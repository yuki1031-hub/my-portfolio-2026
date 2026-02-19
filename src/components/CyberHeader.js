import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles.css';

const CyberHeader = ({ scrollToSection }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (id) => {
        scrollToSection(id);
        setIsOpen(false);
    };

    return (
        <header className="header">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
                <h1 className="logo glitch" data-text="MY PORTFOLIO" style={{ zIndex: 2000 }}>MY PORTFOLIO</h1>

                {/* Animated Single Line Menu Button */}
                <div
                    onClick={toggleMenu}
                    style={{
                        cursor: 'pointer',
                        width: '50px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 2000
                    }}
                >
                    <div className="light-line-menu" style={{
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #fff, transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'lightFlow 2s linear infinite',
                        boxShadow: '0 0 8px #fff'
                    }} />
                    <style>{`
                        @keyframes lightFlow {
                            0% { background-position: 100% 0; }
                            100% { background-position: -100% 0; }
                        }
                    `}</style>
                </div>

                {/* Overlay Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                background: 'rgba(5, 5, 5, 0.95)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '40px',
                                zIndex: 1500
                            }}
                        >
                            {['about', 'career', 'works', 'contact'].map((section) => (
                                <motion.button
                                    key={section}
                                    whileHover={{ scale: 1.1, textShadow: "0 0 10px var(--neon-cyan)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavClick(section)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#fff',
                                        fontFamily: 'var(--font-pixel)',
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    {section === 'career' ? 'LOG.BG' :
                                        section === 'works' ? 'EXE.WORKS' :
                                            section === 'contact' ? 'COM.LINK' : 'DATA.ABOUT'}
                                </motion.button>
                            ))}
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default CyberHeader;
