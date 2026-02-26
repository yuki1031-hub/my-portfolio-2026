import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioLayout from './components/PortfolioLayout';
import ShuffleText from './components/ShuffleText';

const PROJECTS = [
    {
        id: 'figma-layer-to-yaml',
        name: 'Figma Layer to YAML',
        desc: 'Automated code generation Figma plugin',
        image: '/image/figmademo.gif',
        path: '/projects/figma-layer-to-yaml',
    },
    {
        id: 'personality-diagnosis',
        name: '偉人性格診断',
        desc: 'LINE LIFF personality quiz app',
        image: '/image/ijindemo.gif',
        path: '/projects/personality-diagnosis',
    },
    {
        id: 'food-swipe',
        name: '今日何食べる？',
        desc: 'Swipe-based meal decision app',
        image: '/image/fooddemo.gif',
        path: '/projects/food-swipe',
    },
];

export default function DeployProjects() {
    const navigate = useNavigate();

    return (
        <PortfolioLayout>
            <div className="page-shell">
                <div className="page-container">
                    <p className="page-subtitle">— Deploy Projects</p>
                    <h1 className="page-title">
                        <ShuffleText text="Work" duration={1400} />
                    </h1>

                    <div className="projects-grid">
                        {PROJECTS.map((p) => (
                            <div
                                key={p.id}
                                className="project-card-wrap"
                                onClick={() => navigate(p.path)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && navigate(p.path)}
                                aria-label={`View ${p.name}`}
                            >
                                {p.image ? (
                                    <div className="project-card">
                                        <img
                                            className="project-card__thumb"
                                            src={p.image}
                                            alt={p.name}
                                            loading="lazy"
                                        />
                                        <div className="project-card__overlay">
                                            <div className="project-card__name">{p.name}</div>
                                            <div className="project-card__desc">{p.desc}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="project-card project-card--placeholder">
                                        <div className="project-card__name">{p.name}</div>
                                        <div className="project-card__desc">{p.desc}</div>
                                    </div>
                                )}
                                {/* Title below thumbnail */}
                                <div className="project-card__title-below">{p.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
