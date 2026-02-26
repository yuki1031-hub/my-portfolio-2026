import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioLayout from '../components/PortfolioLayout';

export default function PersonalityDiagnosis() {
    const navigate = useNavigate();

    return (
        <PortfolioLayout>
            <div className="project-detail">
                {/* Hero — placeholder dark panel */}
                <div className="project-detail__hero" style={{ background: '#111', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="/image/ijintham2.png"
                        alt="偉人性格診断のサムネイル"
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
                    <h1 className="project-detail__title">偉人性格診断</h1>

                    {/* Tags */}
                    <div className="project-detail__tags">
                        <span className="project-detail__tag">React</span>
                        <span className="project-detail__tag">LINE LIFF</span>
                        <span className="project-detail__tag">JavaScript</span>
                        <span className="project-detail__tag">Personality Quiz</span>
                    </div>

                    {/* Overview */}
                    <p className="project-detail__section-label">Overview</p>
                    <p className="project-detail__text">
                        9つの質問に答えることで、あなたの性格が歴史上の偉人（織田信長・坂本龍馬・諸葛孔明など8タイプ）に例えられる診断アプリ。
                        LINE LIFF 上で動作し、ユーザーのプロフィール名を取得してパーソナライズされた体験を提供します。
                    </p>

                    <hr className="project-detail__divider" />

                    {/* How it works */}
                    <p className="project-detail__section-label">How It Works</p>
                    <p className="project-detail__text">
                        ユーザーは9問の選択式質問（4段階評価）に回答し、合計スコアに応じて8種類のキャラクターのいずれかに分類されます。
                        結果画面では偉人のイラストとともに診断結果が表示され、再診断も可能です。
                    </p>

                    <hr className="project-detail__divider" />

                    {/* Links */}
                    <div className="project-detail__links">
                        <a
                            href="/#/diagnosis"
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
