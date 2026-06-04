'use client';
import { useState, useEffect, useRef } from 'react';
import SiteHeader from '../components/SiteHeader';
import styles from './page.module.css';

const EXTRA_BADGE_STYLES: Record<string, string> = {
  '音声認識AI': 'badgeAI',
  'DB連携': 'badgeDB',
  'Make不要': 'badgeMake',
  'RAG': 'badgeRAG',
  'AI検索': 'badgeAISearch',
  'Python': 'badgePython',
  'エルメ': 'badgeElme',
  'リッチメニュー': 'badgeRichMenu',
  'フォーム': 'badgeForm',
  'タグ分岐': 'badgeTagBranch',
  'LIFF': 'badgeLiff',
  'API連携': 'badgeApiRenkei',
  '抽選': 'badgeChosen',
  'VPS運用': 'badgeVps',
};

const CATEGORIES = [
  { id: 'cat-dev',  label: '① カスタム開発・API連携' },
  { id: 'cat-ai',   label: '② AI活用システム' },
  { id: 'cat-line', label: '③ LINE構築（Lステップ・エルメ）' },
];

interface Project {
  id: string;
  cat: string;
  tag: string;
  name: string;
  badges: string[];
  image: string;
  thumbBg?: string;
  url: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  // ① カスタム開発・API連携（ヒーロー1件）
  {
    id: 'campaign',
    cat: 'cat-dev',
    tag: 'LINE',
    name: '住宅メーカー向け｜大規模LINE抽選キャンペーンを単独構築・本番稼働',
    badges: ['LINE', 'LIFF', 'API連携', '抽選', 'VPS運用'],
    image: '/images/campaign-th.png',
    url: 'https://flying-glazer-dfd.notion.site/LINE-37591932982b804eaff7c06f971c5ea0?source=copy_link',
    featured: true,
  },
  // ② AI活用システム
  {
    id: 'snack',
    cat: 'cat-ai',
    tag: 'LINE',
    name: 'バー・美容室など常連客を持つ店舗向け｜おもてなし自動化サービス',
    badges: ['LINE', '音声認識AI', 'DB連携', 'Make不要'],
    image: '/images/snackth.png',
    url: 'https://flying-glazer-dfd.notion.site/LINE-33091932982b805c9ed4c647158642a1?source=copy_link',
  },
  {
    id: 'ragbot',
    cat: 'cat-ai',
    tag: 'LINE',
    name: 'LINE公式ドキュメント RAGボット',
    badges: ['LINE', 'RAG', 'AI検索', 'Python'],
    image: '/images/ragbot_th_p.png',
    url: 'https://flying-glazer-dfd.notion.site/LINE-RAG-33b91932982b802ab904d10a2fd2d28e?source=copy_link',
  },
  // ③ LINE構築（Lステップ・エルメ）
  {
    id: 'golf',
    cat: 'cat-line',
    tag: 'LINE',
    name: 'ゴルフ用品買取サービス｜エルメ×LINE 集客・フォーム自動化構築',
    badges: ['LINE', 'エルメ', 'リッチメニュー', 'フォーム', 'タグ分岐'],
    image: '/images/golfth.png',
    url: 'https://flying-glazer-dfd.notion.site/LINE-34991932982b8072898bc2df9daed841?source=copy_link',
  },
  {
    id: 'color',
    cat: 'cat-line',
    tag: 'LINE',
    name: 'サロン向け｜予約〜リピートまで無人化したLINE自動化',
    badges: ['Lステップ', '回答フォーム', 'タグ出し分け', 'LINE内CV', 'CV後シナリオ', 'リマインダー'],
    image: '/images/dainamik.png',
    url: 'https://flying-glazer-dfd.notion.site/LINE-32591932982b80d6959cc418402ce460?source=copy_link',
  },
  {
    id: 'flow',
    cat: 'cat-line',
    tag: 'LINE',
    name: '広告運用者向け｜流入元別にLINEメッセージを自動出し分け',
    badges: ['Lステップ', 'URLパラメータ別出し分け', 'ダイナミックメッセージ', '回答フォーム×タグ付け'],
    image: '/images/flow-thumbnail.png',
    url: 'https://flying-glazer-dfd.notion.site/URL-32691932982b807b868ef894a5bfb68d?source=copy_link',
  },
  {
    id: 'ijin',
    cat: 'cat-line',
    tag: 'LINE',
    name: '診断コンテンツ｜9問に答えるだけで偉人タイプを自動判定・結果別メッセージ配信',
    badges: ['Lステップ', '9問スコア加算', '8パターン分岐', 'シナリオ設計'],
    image: '/images/ijin.png',
    url: 'https://flying-glazer-dfd.notion.site/32591932982b80bcaab8e0c287fbab7c?source=copy_link',
  },
  {
    id: 'ijin2',
    cat: 'cat-line',
    tag: 'LINE',
    name: '診断コンテンツ｜9問に答えるだけで偉人タイプを自動判定・結果別メッセージ配信',
    badges: ['Lステップ', '9問スコア加算', '8パターン分岐', 'シナリオ設計'],
    image: '/images/ijin.png',
    url: 'https://flying-glazer-dfd.notion.site/32591932982b80bcaab8e0c287fbab7c?source=copy_link',
  },
  {
    id: 'richmenu',
    cat: 'cat-line',
    tag: 'LINE',
    name: 'リッチメニュー構築',
    badges: ['Lステップ', 'Canva', '3分割レイアウト'],
    image: '/images/rm-thumbnail.png',
    url: 'https://flying-glazer-dfd.notion.site/32591932982b8084b5fcdbcd5bb49b00?source=copy_link',
  },
  // LP（別セクション）
  {
    id: 'kodomoshokudo',
    cat: 'cat4',
    tag: 'LP',
    name: '子ども食堂LP',
    badges: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/chlptmjpg.jpg',
    url: 'https://kodomo-shokudo-lp.vercel.app/',
  },
  {
    id: 'portfolio',
    cat: 'cat4',
    tag: 'Web',
    name: 'ポートフォリオサイト（本サイト）',
    badges: ['Next.js', 'TypeScript', 'CSS Modules'],
    image: '/images/logo.png',
    thumbBg: 'linear-gradient(135deg, #1a4fa0 0%, #b6ff47 100%)',
    url: '/',
  },
  {
    id: 'gym-lp1',
    cat: 'cat4',
    tag: 'LP',
    name: 'ジムLP①',
    badges: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/gym-lp.png',
    url: 'https://gym-lp-gules.vercel.app/',
  },
  {
    id: 'gym-lp2',
    cat: 'cat4',
    tag: 'LP',
    name: 'ジムLP②',
    badges: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/gym2.jpg',
    url: 'https://gym-lp2.vercel.app/',
  },
  {
    id: 'mens-depilation',
    cat: 'cat4',
    tag: 'LP',
    name: 'メンズ脱毛LP',
    badges: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/men.jpg',
    url: 'https://mens-depilation-lp2.vercel.app/',
  },
  {
    id: 'womens-depilation',
    cat: 'cat4',
    tag: 'LP',
    name: 'ウィメンズ脱毛LP',
    badges: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/women.jpg',
    url: 'https://womens-depilation-lp.vercel.app/',
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('cat-dev');
  const categoryNavRef = useRef<HTMLElement>(null);
  const gridRefs = useRef<(HTMLDivElement | null)[]>([]);

  // カテゴリーナビ高さをCSS変数に反映
  useEffect(() => {
    const nav = categoryNavRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--catnav-height', `${nav.offsetHeight}px`);
    });
    ro.observe(nav);
    document.documentElement.style.setProperty('--catnav-height', `${nav.offsetHeight}px`);
    return () => ro.disconnect();
  }, []);

  // スクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    gridRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // スクロールスパイ: アクティブカテゴリー検出
  useEffect(() => {
    const handleScroll = () => {
      const navH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--catnav-height') || '0'
      );
      const offset = navH + 24;
      let current = CATEGORIES[0].id;
      for (const cat of CATEGORIES) {
        const el = document.getElementById(cat.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = cat.id;
        }
      }
      setActiveCategory(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (id: string) => {
    if (window.matchMedia('(hover: none)').matches) {
      setActiveId((prev) => (prev === id ? null : id));
    }
  };

  const renderCard = (p: Project) => {
    const tagClass =
      p.tag === 'LINE' ? styles.categoryLine :
      p.tag === 'Web'  ? styles.categoryWeb  :
      styles.categoryLp;

    return (
      <div
        key={p.id}
        className={`${styles.card} ${activeId === p.id ? styles.cardActive : ''}`}
        onClick={() => handleCardClick(p.id)}
      >
        <div
          className={styles.cardThumb}
          style={p.thumbBg ? { background: p.thumbBg } : undefined}
        >
          <img
            src={p.image}
            alt={p.name}
            className={p.thumbBg ? styles.cardImgContain : styles.cardImg}
          />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.badgeRow}>
            {p.featured && (
              <span className={styles.badgeFeatured}>代表作</span>
            )}
            <span className={tagClass}>{p.tag}</span>
            {p.badges.includes('Lステップ') && (
              <span className={styles.categoryLstep}>Lステップ</span>
            )}
            {p.badges
              .filter((b) => b !== 'LINE' && b !== 'Lステップ' && EXTRA_BADGE_STYLES[b])
              .map((b) => (
                <span key={b} className={styles[EXTRA_BADGE_STYLES[b] as keyof typeof styles]}>{b}</span>
              ))}
          </div>
          <div className={styles.cardName}>{p.name}</div>
        </div>
        <div className={styles.cardOverlay}>
          <a
            href={p.url}
            target={p.url.startsWith('http') ? '_blank' : '_self'}
            rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={styles.overlayMore}
            onClick={(e) => e.stopPropagation()}
          >
            more
          </a>
          <button
            className={styles.overlayClose}
            onClick={(e) => { e.stopPropagation(); setActiveId(null); }}
          >
            close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.page} pageEnter`}>
      <SiteHeader />

      {/* カテゴリーナビ */}
      <nav className={styles.categoryNav} ref={categoryNavRef}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryNavItem} ${activeCategory === cat.id ? styles.categoryNavItemActive : ''}`}
            onClick={() => {
              document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <main className={styles.main} id="works">
        {CATEGORIES.map((cat, catIdx) => {
          const catProjects = PROJECTS.filter((p) => p.cat === cat.id);
          const isHero = cat.id === 'cat-dev';
          return (
            <section key={cat.id} id={cat.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{cat.label}</h2>
              {catProjects.length === 0 ? (
                <p className={styles.comingSoon}>Coming Soon</p>
              ) : (
                <div
                  className={`${isHero ? styles.heroGrid : styles.grid} ${styles.animRow}`}
                  ref={(el) => { gridRefs.current[catIdx] = el; }}
                >
                  {catProjects.map(renderCard)}
                </div>
              )}
            </section>
          );
        })}

        {/* LP・Web制作（別セクション） */}
        <section className={styles.lpSection}>
          <h2 className={styles.lpSectionTitle}>その他の制作（LP）</h2>
          <div
            className={`${styles.lpGrid} ${styles.animRow}`}
            ref={(el) => { gridRefs.current[CATEGORIES.length] = el; }}
          >
            {PROJECTS.filter((p) => p.cat === 'cat4').map(renderCard)}
          </div>
        </section>
      </main>
    </div>
  );
}
