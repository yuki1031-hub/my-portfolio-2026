import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioLayout from '../components/PortfolioLayout';

export default function FoodSwipe() {
    const navigate = useNavigate();

    return (
        <PortfolioLayout>
            <div className="project-detail">
                {/* Hero — placeholder dark panel */}
                <div className="project-detail__hero" style={{ background: '#111', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="/image/foodtham2.png"
                        alt="今日何食べる？のサムネイル"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div className="project-detail__body">
                    {/* Back */}
                    <button className="project-detail__back" onClick={() => navigate('/deploy-projects')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        All Projects
                    </button>

                    {/* Title */}
                    <h1 className="project-detail__title">今日何食べる？</h1>

                    {/* Tags */}
                    <div className="project-detail__tags">
                        <span className="project-detail__tag">Next.js</span>
                        <span className="project-detail__tag">TypeScript</span>
                        <span className="project-detail__tag">Swipe UI</span>
                        <span className="project-detail__tag">Cloudflare Pages</span>
                    </div>

                    {/* Overview */}
                    <p className="project-detail__section-label">Overview</p>
                    <p className="project-detail__text">
                        「今日のランチ・夕食が決められない」という日常の悩みをスワイプ操作で楽しく解決するモバイルウェブアプリ。
                        料理の写真を左右にスワイプして直感的に食べたいものを絞り込み、最終的に「今日のごはん」を決定します。
                    </p>

                    <hr className="project-detail__divider" />

                    {/* How it works */}
                    <p className="project-detail__section-label">How It Works</p>
                    <p className="project-detail__text">
                        カード形式で料理画像を表示し、右スワイプで「食べたい」・左スワイプで「スキップ」と直感操作で絞り込みます。
                        Cloudflare Pages によりグローバルに高速配信。モバイルファーストのレスポンシブデザインを採用しています。
                    </p>

                    <hr className="project-detail__divider" />

                    {/* Links */}
                    <div className="project-detail__links">
                        <a
                            href="https://food-swipe.net"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Demo Link
                        </a>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
