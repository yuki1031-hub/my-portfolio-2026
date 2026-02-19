import React, { useState } from 'react';
import { Github, Mail, ExternalLink, Cpu, Database, Code } from 'lucide-react';
import './styles.css';

import CyberLayout from './components/CyberLayout';
import CyberHeader from './components/CyberHeader';
import CyberHero from './components/CyberHero';
import ProjectTerminal from './components/ProjectTerminal';
import WireframeReveal from './components/WireframeReveal';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CyberLayout>
      <CyberHeader scrollToSection={scrollToSection} />

      <CyberHero />

      {/* --- Projects (New AI App) --- */}
      <section id="projects" className="section">
        <div className="container">
          <h3 className="section-title glitch" data-text="LATEST_PROJECT">LATEST_PROJECT</h3>

          <WireframeReveal
            className="cyber-card"
            style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}
          >
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h4 style={{ color: 'var(--neon-pink)', fontSize: '1.5rem', marginBottom: '10px' }}>
                AI-Powered Prototyper
              </h4>
              <p style={{ marginBottom: '20px', color: '#ccc' }}>
                Currently developing multiple web applications and automation tools by deeply integrating AI into the workflow.
                Focusing on rapid prototyping and transforming ideas into working software through human-AI collaboration.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span className="btn-cyber" style={{ fontSize: '0.7rem' }}>Gemini 1.5 Pro</span>
                <span className="btn-cyber" style={{ fontSize: '0.7rem' }}>Google AI Studio</span>
                <span className="btn-cyber" style={{ fontSize: '0.7rem' }}>Antigravity</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <ProjectTerminal />
            </div>
          </WireframeReveal>
        </div>
      </section>

      {/* --- About --- */}
      <section id="about" className="section">
        <div className="container">
          <h3 className="section-title glitch" data-text="USER_DATA">USER_DATA</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <WireframeReveal className="cyber-card">
              <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '15px' }}><Cpu size={20} /> PROFILE</h4>
              <p><strong>NAME:</strong> HISHIKAWA YUKI</p>
              <p><strong>LOC:</strong> SAITAMA_PREF_JP</p>
              <p><strong>CLASS:</strong> CREATOR / ENGINEER</p>
            </WireframeReveal>

            <WireframeReveal className="cyber-card">
              <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '15px' }}><Database size={20} /> BACKGROUND</h4>
              <ul style={{ paddingLeft: '20px', listStyle: 'square', color: '#ccc' }}>
                <li>MSc in Applied Biology (Kyoto Institute of Tech)</li>
                <li>Production Engineer @ Asahi Soft Drinks (7 years)</li>
                <li>Web Development (Vocational Training)</li>
                <li>Chat Commerce Ops @ Algoage</li>
              </ul>
            </WireframeReveal>

            <WireframeReveal className="cyber-card">
              <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '15px' }}><Code size={20} /> Tech Stack (Co-coded with AI)</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['React', 'TypeScript', 'Node.js', 'Figma', 'Python', 'Git'].map(skill => (
                  <span key={skill} style={{ border: '1px solid var(--neon-yellow)', padding: '2px 8px', fontSize: '0.8rem', color: 'var(--neon-yellow)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </WireframeReveal>
          </div>
        </div>
      </section>

      {/* --- Works --- */}
      <section id="works" className="section">
        <div className="container">
          <h3 className="section-title glitch deployed-title" data-text="EXECUTABLES">DEPLOYED_PROJECTS</h3>

          <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>

            {/* Figma Plugin */}
            <WireframeReveal className="cyber-card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff' }}>Figma Layer to YAML</h4>
              <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px' }}>Automated code generation plugin.</p>
              <img
                src="/image/figmademo.gif"
                alt="Demo"
                style={{ width: '100%', borderRadius: '4px', border: '1px solid #333', cursor: 'pointer' }}
                onClick={() => setIsModalOpen(true)}
              />
              <div style={{ marginTop: '15px' }}>
                <a href="https://github.com/yuki1031-hub/figma-layer-to-yaml-plugin.git" className="btn-cyber" target="_blank" rel="noopener noreferrer">
                  <Github size={16} style={{ marginRight: '5px' }} /> SOURCE
                </a>
              </div>
            </WireframeReveal>

            {/* Scenario-based Bot (Merged) */}
            <WireframeReveal className="cyber-card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff' }}>[Conversational UX] Scenario-based Bot</h4>
              <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px' }}>
                Dynamic scenario branching prototype for conversational UI. Implements gamification elements like personality diagnosis.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/diagnosis" className="btn-cyber" style={{ fontSize: '0.8rem' }}>
                  <ExternalLink size={14} style={{ marginRight: '5px' }} /> DIAGNOSIS
                </Link>
                <Link to="/ad-chatbot" className="btn-cyber" style={{ fontSize: '0.8rem' }}>
                  <ExternalLink size={14} style={{ marginRight: '5px' }} /> AD CHATBOT
                </Link>
              </div>
            </WireframeReveal>

          </div>
        </div>
      </section>

      {/* --- Contact --- */}
      <section id="contact" className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h3 className="section-title glitch" data-text="COMMUNICATION" style={{ margin: '0 auto 40px auto', width: 'fit-content', position: 'static', transform: 'none', display: 'block' }}>COMMUNICATION</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', position: 'relative', zIndex: 20 }}>
            <a href="mailto:hishikawa1031@mail.com" className="btn-cyber">
              <Mail size={20} style={{ marginRight: '10px' }} /> MAIL
            </a>
            <a href="https://github.com/yuki1031-hub" target="_blank" rel="noopener noreferrer" className="btn-cyber">
              <Github size={20} style={{ marginRight: '10px' }} /> GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Modal for Images */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" style={{ border: '2px solid var(--neon-pink)', padding: '10px', background: '#000' }}>
            <img src="/image/figmademo.gif" alt="Demo" />
            <p className="modal-close-msg" style={{ fontFamily: 'var(--font-pixel)', color: 'var(--neon-pink)', marginTop: '10px' }}>[CLICK TO CLOSE]</p>
          </div>
        </div>
      )}

    </CyberLayout>
  );
};

export default Home;
