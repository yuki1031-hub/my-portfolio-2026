import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// --- アイコン部品 (SVG) ---
const IconGithub = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const IconExternal = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconWrench = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-container">
      
      {/* --- ヘッダー --- */}
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">My Portfolio</h1>
          <nav className="nav-menu">
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('career')}>Background</button>
            <button onClick={() => scrollToSection('works')}>Works</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </nav>
        </div>
      </header>

      {/* --- 1. 自己紹介 (ツール一覧) --- */}
      <section id="about" className="section bg-white">
        <div className="container">
          <h3 className="section-title">About Me</h3>
          
          <div className="about-layout">
            <div className="about-left">
              <div className="profile-image-placeholder">
              <img src="/image/plf.JPG" alt="プロフィール写真" />
              </div>
              <h4 className="profile-name">菱川 雄紀(ひしかわ ゆうき)</h4>
              <div className="profile-details">
                <p><strong>出身地・居住地:</strong> 兵庫県（現在は埼玉県）</p>
                <p><strong>趣味:</strong> 読書、キャンプ</p>
              </div>
            </div>

            <div className="about-right">
              <div className="timeline-section">
                <h4 className="subsection-title">経歴</h4>
                <ul className="timeline-list">
                  <li>
                    <span className="tag tag-blue">学歴</span>
                    <span>京都工芸繊維大学 大学院 応用生物学専攻 卒業</span>
                  </li>
                  <li>
                    <span className="tag tag-green">職歴</span>
                    <div>
                      <strong>アサヒ飲料株式会社 (生産技術職 7年)</strong>
                      <p className="desc">工場の生産ライン設計・新商品のプロジェクトマネジメントに従事。</p>
                    </div>
                  </li>
                  <li>
                    <span className="tag tag-purple">学習</span>
                    <span>職業訓練校にてWebデザイン・コーディングの基礎を習得</span>
                  </li>
                  <li>
                    <span className="tag tag-green">職歴</span>
                    <div>
                      <strong>株式会社Algoage (チャットコマース運用)</strong>
                      <p className="desc">シナリオの実装業務を担当。</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="skills-section">
                <h4 className="subsection-title">技術スタック</h4>
                <div className="skills-list">
                  {['HTML/CSS', 'JavaScript', 'React'].map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>

                <h4 className="subsection-title" style={{marginTop: '20px'}}>使用ツール</h4>
                <div className="tools-grid">
                   <div className="tool-item">
                     <span className="tool-icon">
                     <img src="/image/vscode.png" alt="vscode" />
                     </span><span>VS Code</span>
                   </div>
                   <div className="tool-item">
                     <span className="tool-icon">
                     <img 
                     src="/image/figma.png" 
                     alt="figma" 
                     style={{ width: '36px', height: '36px' }}
                     />
                     </span><span>Figma</span>
                   </div>
                   <div className="tool-item">
                     <span className="tool-icon">
                     <img src="/image/slack.png" alt="Slack" />
                     </span><span>Slack</span>
                   </div>
                   <div className="tool-item">
                     <span className="tool-icon">
                     <img src="/image/notion-logo.png" alt="notion" />
                     </span><span>Notion</span>
                   </div>
                   <div className="tool-item">
                     <span className="tool-icon">
                     <img src="/image/gitHub.png" alt="github" />
                     </span><span>Git/GitHub</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. 前職の業務 (Background) --- */}
      <section id="career" className="section bg-gray">
        <div className="container">
          <h3 className="section-title">Background</h3>
          <div className="career-card">
            <h4 className="career-card-title">
              <span className="icon-wrapper"><IconWrench /></span>
              業務上の課題と解決へのアプローチ
            </h4>
            
            <div className="career-content">
              <h5>担当業務：チャットボットの実装</h5>
              <p>Figmaの会話フロー図を元に、独自のYAMLコードに変換して実装する業務を担当。</p>
            </div>
            
            <div className="pain-point-box">
              <h5>🚨 直面した課題</h5>
              <p>
                目視確認による手動転記作業が頻発。<br/>
                単純ミスによる手戻りや、確認作業に膨大な工数が割かれていました。
              </p>
            </div>

            <div className="solution-arrow">
              <p>▼ この課題を解決するために、ツールを開発しました</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. 制作物 (Works) --- */}
      <section id="works" className="section bg-white">
        <div className="container">
          <h3 className="section-title">Works</h3>

          {/* メイン作品：プラグイン */}
          <div className="work-highlight-card">
            <div className="work-image-area">
              <img 
                src="/image/figmademo.gif" 
                alt="Figmaプラグインの動作デモ" 
                onClick={() => setIsModalOpen(true)}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: 'zoom-in' 
                }}
              />
              <p style={{textAlign:'center', fontSize:'0.8rem', color:'#888', marginTop:'8px'}}>
                👆クリックで拡大再生
              </p>
            </div>
            <div className="work-content-area">
              <div className="work-category">業務効率化ツール</div>
              <h4 className="work-title">Figmaレイヤー構造 自動コード生成プラグイン</h4>
              <p className="work-desc">
                Figmaのデザインデータを解析し、ワンクリックで実装用コード(YAML)を出力。
                再帰処理を用いて深い階層構造も正確に変換します。
              </p>
              
              <div className="tech-stack">
                <span>TypeScript</span><span>React</span><span>Figma API</span>
              </div>

              <div className="work-links">
                <a href="https://github.com/yuki1031-hub/figma-layer-to-yaml-plugin.git" target="_blank" rel="noopener noreferrer">
                  <IconGithub /> Source Code
                </a>
              </div>
            </div>
          </div>

          <div className="chatbot-group-container">
            <div className="chatbot-group-header">
               <span className="chatbot-icon-large">💬</span>
               <h4>チャットボットのイメージ</h4>
               <p className="chatbot-group-desc">
                 （View Demoをクリックするとデモ画面へ移動します）
               </p>
            </div>

            <div className="works-grid">
              {/* 1. 性格診断 */}
              <div className="work-card">
                <h4>性格診断チャットボット</h4>
                <p className="work-desc-sm">
                  <strong>【概要】</strong><br/>
                  LINE LIFF 上で動作する「偉人タイプ診断」アプリケーションです。
                   ユーザーの回答に合わせて歴史上の偉人を判定し、結果画像を生成・表示します。
                </p>
                <div className="tech-stack-mini">
                  <span>React</span><span>UI/UX</span>
                </div>
                <Link to="/diagnosis" className="link-text">
                  View Demo <IconExternal />
                </Link>
              </div>

              {/* 2. 広告チャット */}
              <div className="work-card">
                <h4>広告型チャットボット</h4>
                <p className="work-desc-sm">
                  <strong>【概要】</strong><br/>
                  LINE LIFF 上で動作する「クレジットカードのCVを目的とした」広告型のアプリケーションです
                </p>
                <div className="tech-stack-mini">
                  <span>React</span><span>Marketing</span>
                </div>
                <Link to="/ad-chatbot" className="link-text">
                  View Demo <IconExternal />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 4. Contact --- */}
      <section id="contact" className="section footer-section">
        <div className="container text-center">
          <h3>Contact</h3>
          <div className="contact-links">
            <a href="mailto:hishikawa1031@gmail.com">
              <IconMail /> hishikawa1031@gmail.com
            </a>
            <a href="https://github.com/yuki1031-hub" target="_blank" rel="noopener noreferrer">
              <IconGithub /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="footer-copyright">
        &copy; {new Date().getFullYear()} Yuki Hishikawa. All rights reserved.
      </footer>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <img src="/image/figmademo.gif" alt="拡大デモ" />
            <p className="modal-close-msg">✕ 閉じる</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;