'use client';
import { useState, useEffect, useRef } from 'react';
import SiteHeader from '../components/SiteHeader';
import styles from './page.module.css';

const PROJECTS = [
  {
    id: 'ijin',
    name: '性格診断（点数制ロジック）',
    category: 'LINE',
    badges: ['Lステップ', '9問スコア加算', '8パターン分岐', 'シナリオ設計'],
    desc: '9問のスコア加算方式で、合計点数に応じて8パターンの偉人キャラクターを診断。シナリオ分岐とリッチメニュー連動で没入感のある体験を設計。',
    image: '/images/ijin.png',
    url: 'https://flying-glazer-dfd.notion.site/32591932982b80bcaab8e0c287fbab7c?source=copy_link',
  },
  {
    id: 'color',
    name: '予約×自動化シナリオ',
    category: 'LINE',
    badges: ['Lステップ', '回答フォーム', 'タグ出し分け', 'LINE内CV', 'CV後シナリオ', 'リマインダー'],
    desc: 'LINE追加からユーザーの出し分け、予約完了・リピート促進まで全自動で動くエステサロン向けシナリオ',
    image: '/images/dainamik.png',
    url: 'https://flying-glazer-dfd.notion.site/LINE-32591932982b80d6959cc418402ce460?source=copy_link',
  },
  {
    id: 'flow',
    name: 'URLパラメータ別シナリオ出し分け',
    category: 'LINE',
    badges: ['Lステップ', 'URLパラメータ別出し分け', 'ダイナミックメッセージ', '回答フォーム×タグ付け'],
    desc: 'Instagram広告・Google広告それぞれの流入元に応じてシナリオを自動で出し分け。ヒアリングフォームの回答結果をもとにタグを自動付与し、興味ジャンルに合わせたコース案内を配信。',
    image: '/images/flow-thumbnail.png',
    url: 'https://flying-glazer-dfd.notion.site/URL-32691932982b807b868ef894a5bfb68d?source=copy_link',
  },
  {
    id: 'richmenu',
    name: 'リッチメニュー構築',
    category: 'LINE',
    badges: ['Lステップ', 'Canva', '3分割レイアウト'],
    desc: '転職相談サービス向けのリッチメニュー。3分割レイアウトで各ボタンに外部URLを設定。Canvaでクリエイティブを制作しLステップに実装。',
    image: '/images/rm-thumbnail.png',
    url: 'https://flying-glazer-dfd.notion.site/32591932982b8084b5fcdbcd5bb49b00?source=copy_link',
  },
  {
    id: 'gym-lp1',
    name: 'ジムLP①',
    category: 'LP',
    badges: ['HTML', 'CSS', 'JavaScript'],
    desc: 'ジムの入会促進LP。ダークトーンとオレンジのコントラストで力強い印象を演出。',
    image: '/images/gym-lp.png',
    url: 'https://gym-lp-gules.vercel.app/',
  },
  {
    id: 'gym-lp2',
    name: 'ジムLP②',
    category: 'LP',
    badges: ['HTML', 'CSS', 'JavaScript'],
    desc: 'タブ切り替え・スライダー・ビフォーアフター機能付きのリッチなジムLP。',
    image: '/images/gym2.jpg',
    url: 'https://gym-lp2.vercel.app/',
  },
  {
    id: 'mens-depilation',
    name: 'メンズ脱毛LP',
    category: 'LP',
    badges: ['HTML', 'CSS', 'JavaScript'],
    desc: '男性向け脱毛サロンのLP。落ち着いたネイビーとオレンジで信頼感と活力を表現。',
    image: '/images/men.jpg',
    url: 'https://mens-depilation-lp2.vercel.app/',
  },
  {
    id: 'womens-depilation',
    name: 'ウィメンズ脱毛LP',
    category: 'LP',
    badges: ['HTML', 'CSS', 'JavaScript'],
    desc: '女性向け脱毛サロンのLP。優しいグラデーションで清潔感と上品さを演出。',
    image: '/images/women.jpg',
    url: 'https://womens-depilation-lp.vercel.app/',
  },
  {
    id: 'kodomoshokudo',
    name: '子ども食堂LP',
    category: 'LP',
    badges: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    desc: '地域の子ども食堂のLP。温かみのある色合いとNext.jsで高速表示を実現。',
    image: '/images/kodomo.jpg',
    url: 'https://kodomoshokudo-lp.vercel.app/',
  },
];

export default function Home() {
  // スマホ用: タップで開いたカードのID
  const [activeId, setActiveId] = useState<string | null>(null);
  // スクロールアニメーション用
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver (スクロール時に下から上アニメ)
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
      { threshold: 0.1 }
    );
    rowRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // スマホタップハンドラ
  const handleCardClick = (id: string) => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      setActiveId((prev) => (prev === id ? null : id));
    }
  };

  const topProjects = PROJECTS.slice(0, 3);
  const restProjects = PROJECTS.slice(3);
  const pairs: (typeof PROJECTS)[] = [];
  for (let i = 0; i < restProjects.length; i += 2) {
    pairs.push(restProjects.slice(i, i + 2));
  }

  return (
    <div className={`${styles.page} pageEnter`}>
      <SiteHeader />

      <main className={styles.main} id="works">
        {/* 上位 3件 — 3列 */}
        <div
          className={`${styles.topRow} ${styles.animRow}`}
          ref={(el) => { rowRefs.current[0] = el; }}
        >
          {topProjects.map((p) => (
            <div
              key={p.id}
              className={`${styles.card} ${activeId === p.id ? styles.cardActive : ''}`}
              onClick={() => handleCardClick(p.id)}
            >
              <div className={styles.cardThumb}>
                <img src={p.image} alt={p.name} className={styles.cardImg} />
              </div>
              <div className={styles.cardInfo}>
                <span className={p.category === 'LINE' ? styles.categoryLine : styles.categoryLp}>{p.category}</span>
                <div className={styles.cardName}>{p.name}</div>
              </div>
              {/* ホバー / タップ オーバーレイ */}
              <div className={styles.cardOverlay}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.overlayMore}
                  onClick={(e) => e.stopPropagation()}
                >
                  more
                </a>
                {/* close はスマホのみ表示 */}
                <button
                  className={styles.overlayClose}
                  onClick={(e) => { e.stopPropagation(); setActiveId(null); }}
                >
                  close
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* それ以降 — 2列ペア */}
        <div className={styles.bottomSection}>
          {pairs.map((pair, i) => (
            <div
              key={i}
              className={`${styles.pairRow} ${styles.animRow}`}
              ref={(el) => { rowRefs.current[i + 1] = el; }}
            >
              {pair.map((p) => (
                <div
                  key={p.id}
                  className={`${styles.card} ${activeId === p.id ? styles.cardActive : ''}`}
                  onClick={() => handleCardClick(p.id)}
                >
                  <div className={styles.cardThumb}>
                    <img src={p.image} alt={p.name} className={styles.cardImg} />
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={p.category === 'LINE' ? styles.categoryLine : styles.categoryLp}>{p.category}</span>
                    <div className={styles.cardName}>{p.name}</div>
                  </div>
                  <div className={styles.cardOverlay}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
