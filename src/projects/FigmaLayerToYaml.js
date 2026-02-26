import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioLayout from '../components/PortfolioLayout';

export default function FigmaLayerToYaml() {
    const navigate = useNavigate();

    return (
        <PortfolioLayout>
            <div className="project-detail">
                {/* Hero: Demo GIF */}
                <div className="project-detail__hero">
                    <img
                        src="/image/figmademo.gif"
                        alt="Figma Layer to YAML demo"
                    />
                </div>

                <div className="project-detail__body">
                    {/* Back */}
                    <button
                        className="project-detail__back"
                        onClick={() => navigate('/deploy-projects')}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        All Projects
                    </button>

                    {/* Title */}
                    <h1 className="project-detail__title">Figma Layer to YAML</h1>

                    {/* Tags */}
                    <div className="project-detail__tags">
                        <span className="project-detail__tag">Figma Plugin</span>
                        <span className="project-detail__tag">TypeScript</span>
                        <span className="project-detail__tag">YAML</span>
                        <span className="project-detail__tag">Code Generation</span>
                    </div>

                    {/* Overview */}
                    <p className="project-detail__section-label">Overview</p>
                    <p className="project-detail__text">
                        選択したフレームのレイヤー構造を読み取り、構造化された「YAML形式」のデータに変換シリアライズ）してくれるFigmaプラグインです。
                        デザインとエンジニアリング（開発）のギャップを埋めることを目的として設計されており
                        Figmaのデザインデータから直接、コードの自動生成、デザイントークン（色や余白などの共通ルール）の抽出
                        AIを活用したコンポーネントの土台作りなどを可能にします。
                    </p>

                    <hr className="project-detail__divider" />

                    {/* How it works */}
                    <p className="project-detail__section-label">How It Works</p>
                    <p className="project-detail__text">
                        Figma上で任意のフレームやグループを選択してプラグインを実行するだけで、レイヤーの完全な階層構造（名前、種類、制約、色、テキストの内容など）を正確に反映した、きれいなYAMLファイルが出力されます。
                        出力されたデータは、コンポーネントの自動生成やドキュメント作成といった、後続の開発ツールとそのまま連携（互換）できるように作られています。
                    </p>

                    <hr className="project-detail__divider" />

                    {/* Links */}
                    <div className="project-detail__links">
                        <a
                            href="https://github.com/yuki1031-hub/figma-layer-to-yaml-plugin.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            View Source on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
