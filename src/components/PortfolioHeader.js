import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PortfolioHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <header className="portfolio-header">
                {/* Logo */}
                <Link to="/" className="portfolio-header__logo">
                    Hishikawa Yuki
                </Link>

                {/* Hamburger button — single animated line */}
                <button
                    className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    <span className="hamburger__line" />
                </button>
            </header>

            {/* Full-screen overlay menu */}
            <div className={`nav-overlay${menuOpen ? ' nav-overlay--open' : ''}`} aria-hidden={!menuOpen}>
                <nav className="nav-overlay__menu">
                    <Link to="/deploy-projects" className="nav-overlay__link" tabIndex={menuOpen ? 0 : -1}>
                        <span className="nav-overlay__num">01</span>
                        Deploy Projects
                    </Link>
                    <Link to="/contact" className="nav-overlay__link" tabIndex={menuOpen ? 0 : -1}>
                        <span className="nav-overlay__num">02</span>
                        Contact
                    </Link>
                </nav>
                {/* Dim backdrop click to close */}
                <button className="nav-overlay__backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" tabIndex={-1} />
            </div>
        </>
    );
}
