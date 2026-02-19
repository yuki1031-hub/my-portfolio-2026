import React from 'react';
import '../styles.css';
import { Menu } from 'lucide-react';

const CyberHeader = ({ scrollToSection }) => {
    return (
        <header className="header">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h1 className="logo glitch" data-text="MY PORTFOLIO">MY PORTFOLIO</h1>

                <nav className="nav-menu">
                    <button onClick={() => scrollToSection('about')}>DATA.ABOUT</button>
                    <button onClick={() => scrollToSection('career')}>LOG.BG</button>
                    <button onClick={() => scrollToSection('works')}>EXE.WORKS</button>
                    <button onClick={() => scrollToSection('contact')}>COM.LINK</button>
                </nav>
            </div>
        </header>
    );
};

export default CyberHeader;
