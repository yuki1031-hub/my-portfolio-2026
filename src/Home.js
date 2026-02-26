import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LiquidMetalBackground from './components/LiquidMetalBackground';
import './styles.css';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="home-page">

      {/* ── Top bar (sits in top black margin) ── */}
      <div className="home-top-bar">
        <span className="home-logo">Hishikawa Yuki</span>
        <button
          className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="hamburger__line" />
        </button>
      </div>

      {/* ── Canvas frame (centered, fills remaining space) ── */}
      <div className="home-page__frame">
        <LiquidMetalBackground />
        {/* Name overlay — centered over the canvas */}
        <div className="home-page__content">
          <h1 className="home-page__name">HISHIKAWA YUKI</h1>
        </div>
      </div>


      {/* ── Bottom bar (sits in bottom black margin) ── */}
      <div className="home-bottom-bar">
        <button
          className="home-explore-btn"
          onClick={() => navigate('/deploy-projects')}
        >
          Deploy Projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Full-screen nav overlay ── */}
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
        <button
          className="nav-overlay__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          tabIndex={-1}
        />
      </div>

    </div>
  );
}
