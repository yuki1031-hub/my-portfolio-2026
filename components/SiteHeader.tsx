'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { runPageTransition } from './pageTransition';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Escape キーで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ページトランジション付き遷移（アンカーはスクロール、別ページは push）
  const navigate = async (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    await runPageTransition();
    router.push(href);
  };

  return (
    <>
      {/* ─── Header ─── */}
      <header className={styles.header}>
        {/* ロゴ画像 */}
        <img src="/images/logo.png" alt="ロゴ" className={styles.logoBox} />

        {/* 中央: nav リンク + CTA */}
        <div className={styles.mid}>
          <div className={styles.midBottom}>
            <nav className={styles.headerNav} aria-label="ページナビゲーション">
              <button className={styles.navLink} onClick={() => navigate('/#services')}>SERVICES</button>
              <button className={styles.navLink} onClick={() => navigate('/#cases')}>CASES</button>
              <button className={styles.navLink} onClick={() => navigate('/about')}>ABOUT</button>
              <a
                className={styles.navLinkDev}
                href="https://my-portfolio-2026-tech.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dev Portfolio
              </a>
              <button className={styles.ctaLine} onClick={() => navigate('/#contact')}>
                LINE集客・構築を相談する
              </button>
              <button className={styles.ctaSystem} onClick={() => navigate('/#contact')}>
                システム・AI開発を相談する
              </button>
            </nav>
          </div>
        </div>

        {/* 菱の花ボタン */}
        <div className={styles.right}>
          <button
            className={`${styles.flowerBtn} ${isOpen ? styles.flowerOpen : ''}`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isOpen}
          >
            <svg
              className={styles.flowerSvg}
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path className={styles.petal}
                d="M 100,28 C 126,55 126,80 100,104 C 74,80 74,55 100,28 Z" />
              <path className={styles.petal}
                d="M 100,172 C 74,145 74,120 100,96 C 126,120 126,145 100,172 Z" />
              <path className={styles.petal}
                d="M 28,100 C 55,74 80,74 104,100 C 80,126 55,126 28,100 Z" />
              <path className={styles.petal}
                d="M 172,100 C 145,74 120,74 96,100 C 120,126 145,126 172,100 Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ─── スクリム ─── */}
      <div
        className={`${styles.scrim} ${isOpen ? styles.scrimOpen : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ─── メニューパネル（右からスライド） ─── */}
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="navigation"
        aria-label="メインメニュー"
      >
        <div className={styles.panelLine} aria-hidden="true" />

        <nav className={styles.panelNav}>
          <button className={styles.panelItem} onClick={() => navigate('/#services')}>
            <span className={styles.panelEn}>Services</span>
          </button>
          <button className={styles.panelItem} onClick={() => navigate('/#cases')}>
            <span className={styles.panelEn}>Cases</span>
          </button>
          <button className={styles.panelItem} onClick={() => navigate('/#contact')}>
            <span className={styles.panelEn}>Contact</span>
          </button>
          <button className={styles.panelItem} onClick={() => navigate('/about')}>
            <span className={styles.panelEn}>About</span>
          </button>
          <a
            className={`${styles.panelItem} ${styles.panelItemDev}`}
            href="https://my-portfolio-2026-tech.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            <span className={styles.panelEn}>Dev Portfolio</span>
          </a>
        </nav>

        {/* 透かし花 */}
        <div className={styles.watermark} aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path className={styles.watermarkPetal}
              d="M 100,28 C 126,55 126,80 100,104 C 74,80 74,55 100,28 Z" />
            <path className={styles.watermarkPetal}
              d="M 100,172 C 74,145 74,120 100,96 C 126,120 126,145 100,172 Z" />
            <path className={styles.watermarkPetal}
              d="M 28,100 C 55,74 80,74 104,100 C 80,126 55,126 28,100 Z" />
            <path className={styles.watermarkPetal}
              d="M 172,100 C 145,74 120,74 96,100 C 120,126 145,126 172,100 Z" />
          </svg>
        </div>
      </div>
    </>
  );
}
