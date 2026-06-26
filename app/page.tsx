'use client';
import { useEffect, useRef } from 'react';
import SiteHeader from '../components/SiteHeader';
import styles from './page.module.css';

/* ─── 事例データ ─── */
const CASES = [
  {
    id: 'campaign',
    title: '既製ツールで実現できなかった抽選キャンペーンを、フルスクラッチで本番稼働',
    challenge: '住宅メーカーが集客イベントでLINE友だちを増やしたいが、抽選の仕組みを既製ツールで実現できず、複数イベントを横断運用する手段もなかった',
    approach: 'LIFF＋抽選API＋VPSでフルスクラッチ構築。Lステップのタグ連携で、フォーム入力〜抽選〜結果配信を自動化。1つの基盤で複数キャンペーンを切替運用できる設計に',
    result: '本番稼働し、複数イベント（ペットフェスふくしま等）で実運用。稼働中の不具合対応まで単独で完遂',
    tags: ['LIFF', 'Digico API', 'SQLite', 'さくらVPS', 'Lステップ'],
    url: 'https://flying-glazer-dfd.notion.site/LINE-37591932982b804eaff7c06f971c5ea0?source=copy_link',
    featured: true,
    arch: [
      { id: 'line', label: 'LINE', desc: 'ユーザーが友だち追加・フォーム入力' },
      { id: 'liff', label: 'LIFF', desc: 'LINE内ブラウザで動作するWebアプリ。入力受付〜抽選トリガー' },
      { id: 'api', label: '抽選 API', desc: 'Digico API と独自ロジックで公平な抽選を実行' },
      { id: 'vps', label: 'さくらVPS', desc: 'Node.js サーバー + SQLite でデータ永続化・複数キャンペーン管理' },
      { id: 'lstep', label: 'Lステップ', desc: 'タグ連携で当選/落選メッセージを自動配信' },
    ],
  },
  {
    id: 'snack',
    title: '外部ツール不要で、常連客の来店記録を自動化',
    challenge: 'バー・美容室など常連商売の店舗が、来店記録や顧客対応を手作業で行っており属人化していた',
    approach: 'LINE音声認識（Whisper）＋AI＋DB連携で、会話から顧客情報を自動記録。Make等の外部ツール不要・低コストで実現',
    result: '接客しながら記録が残る仕組みを構築。ランニングコストを抑えた運用が可能に',
    tags: ['Messaging API', 'Whisper', 'GPT-4o-mini', 'Google Sheets'],
    url: 'https://flying-glazer-dfd.notion.site/LINE-33091932982b805c9ed4c647158642a1?source=copy_link',
  },
  {
    id: 'ragbot',
    title: '公式ドキュメントを学習し、問い合わせ対応を自動化',
    challenge: 'LINE公式の仕様は範囲が広く、問い合わせのたびに調べる手間が発生していた',
    approach: '公式ドキュメントをベクトル化し、RAGで回答するチャットボットを構築',
    result: 'ドキュメントに基づく回答を自動化。デモとして公開・検証可能',
    tags: ['Python', 'LangChain', 'FAISS', 'FastAPI', 'Streamlit'],
    url: 'https://flying-glazer-dfd.notion.site/LINE-RAG-33b91932982b802ab904d10a2fd2d28e?source=copy_link',
  },
];

/* ─── 実績データ ─── */
const ACHIEVEMENTS = [
  { company: '株式会社Capex', detail: 'LINE公式アカウント配信の品質管理を継続受託' },
  { company: '住宅メーカー', detail: '大規模LINE抽選キャンペーンを単独構築・本番稼働' },
  { company: 'ゴルフ用品買取サービス', detail: 'エルメ × LINE の集客・フォーム自動化を構築' },
  { company: 'クラウドソーシング', detail: 'Lancers / CrowdWorks 経由で継続案件を受注' },
];

export default function Home() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const numbersRef = useRef<HTMLSpanElement[]>([]);
  const archRef = useRef<HTMLDivElement>(null);

  /* ─── Lenis スムーススクロール ─── */
  useEffect(() => {
    let lenis: import('lenis').default | null = null;
    let rafId: number;

    (async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  /* ─── GSAP アニメーション ─── */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      /* ヒーロー: 行ごと reveal */
      const lines = heroTextRef.current?.querySelectorAll('[data-reveal]');
      if (lines) {
        gsap.fromTo(
          Array.from(lines),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.15,
            delay: 0.3,
          }
        );
      }

      /* セクション: slide-up（opacity は除外 — sticky hero を透かさないため） */
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40 },
          {
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* ヒーロー: コピーのドリフト + フェード (scrub) */
      const heroCopy = heroTextRef.current;
      if (heroCopy) {
        gsap.to(heroCopy, {
          y: -Math.round(window.innerHeight * 0.18),
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      /* ヒーロー: 右ビジュアルのパララックス (PC のみ、コピーより遅め) */
      if (window.innerWidth >= 768) {
        const heroVisual = document.querySelector('[data-parallax-hero]');
        if (heroVisual) {
          gsap.to(heroVisual, {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    })();
  }, []);

  /* ─── カウントアップ ─── */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = numbersRef.current.filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLSpanElement;
          const target = Number(el.dataset.target ?? 0);
          if (reduced) { el.textContent = String(target); return; }
          let start = 0;
          const step = () => {
            start += Math.ceil((target - start) / 8);
            el.textContent = String(start);
            if (start < target) requestAnimationFrame(step);
            else el.textContent = String(target);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ─── セクション ref 登録ヘルパー ─── */
  const addSectionRef = (i: number) => (el: HTMLElement | null) => {
    if (el) sectionsRef.current[i] = el;
  };

  /* ─── アーキテクチャ図 ─── */
  const ArchDiagram = () => {
    const caseData = CASES[0];
    return (
      <div className={styles.archWrap} ref={archRef}>
        <p className={styles.archLabel}>システム構成</p>
        <div className={styles.archFlow}>
          {caseData.arch!.map((node, i) => (
            <div key={node.id} className={styles.archNodeWrap}>
              <div className={styles.archNode} tabIndex={0}>
                <span className={styles.archNodeLabel}>{node.label}</span>
                <span className={styles.archNodeDesc}>{node.desc}</span>
              </div>
              {i < caseData.arch!.length - 1 && (
                <span className={styles.archArrow} aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.page} pageEnter`}>
      <SiteHeader />

      {/* ════════════════════════════════════
          1. HERO
      ════════════════════════════════════ */}
      <section id="hero" className={styles.hero}>
        {/* 背景レイヤー: ヒーローに白地を確保 */}
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          {/* 左: テキスト */}
          <div className={styles.heroText} ref={heroTextRef}>
            <span className={styles.heroConceptLabel} data-reveal>Concept</span>
            <h1 className={styles.heroHeading}>
              {/* 推奨案B。他案はコメントで保持:
                  A: "作って終わり"にしない。集客が回る仕組みまで設計する
                  C: "何から頼めばいいか分からない" を解決する
              */}
              <span className={styles.heroLine} data-reveal>ノーコードの限界も、</span>
              <span className={styles.heroLine} data-reveal>コードで超える。</span>
            </h1>
            <p className={styles.heroSubtitle} data-reveal>
              LINE構築 × システム開発
            </p>
            <p className={styles.heroDesc} data-reveal>
              Lステップ・エルメでのLINE構築から、LIFF・API連携・VPS運用まで。
              <br className={styles.heroDescBr} />
              フリーランスエンジニアが一気通貫で対応します。
            </p>
            <div className={styles.heroCta} data-reveal>
              <a href="#contact" className={styles.ctaPrimary}>
                LINE集客・構築を相談する
              </a>
              <a href="#contact" className={styles.ctaSecondary}>
                システム・AI開発を相談する
              </a>
            </div>
          </div>

          {/* 右: ビジュアル（パララックス対象） */}
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroVisual} data-parallax-hero>
              <div className={styles.heroVisualPlaceholder}>
                {/* 画像差し替え予定: <img src="/images/hero.png" alt="" /> */}
                <div className={styles.heroVisualBg}>
                  <div className={styles.heroDeco1} />
                  <div className={styles.heroDeco2} />
                  <div className={styles.heroDeco3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className={styles.mainContent}>
        {/* ════════════════════════════════════
            2. SERVICES
        ════════════════════════════════════ */}
        <section id="services" className={`${styles.section} ${styles.sectionFirst}`} ref={addSectionRef(0)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>Services</div>
            <h2 className={styles.sectionTitle}>「解決できること」で選べる3つのサービス</h2>

            {/* 01 */}
            <div className={styles.serviceItem}>
              <div className={styles.serviceImgWrap}>
                <div className={styles.serviceImgPlaceholder}>
                  <img src="/images/campaign-th.png" alt="カスタム開発" className={styles.serviceImg} />
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.serviceNum}>01</div>
                <h3 className={styles.serviceHeading}>カスタム開発・API連携</h3>
                <p className={styles.serviceDesc}>既製ツールでは実現できない仕組みを、コードで構築します。</p>
                <ul className={styles.serviceMenu}>
                  <li>LIFF / Messaging API を使ったLINEアプリ開発</li>
                  <li>抽選・キャンペーンシステムのフルスクラッチ構築</li>
                  <li>VPS構築・本番運用・保守</li>
                </ul>
                <a
                  href="https://flying-glazer-dfd.notion.site/LINE-37591932982b804eaff7c06f971c5ea0?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.serviceLink}
                >
                  事例を見る →
                </a>
              </div>
            </div>

            {/* 02 */}
            <div className={`${styles.serviceItem} ${styles.serviceItemReverse}`}>
              <div className={styles.serviceImgWrap}>
                <div className={styles.serviceImgPlaceholder}>
                  <img src="/images/snackth.png" alt="AI活用システム" className={styles.serviceImg} />
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.serviceNum}>02</div>
                <h3 className={styles.serviceHeading}>AI活用システム</h3>
                <p className={styles.serviceDesc}>音声・テキスト・ドキュメントを AI に繋ぎ、業務を自動化します。</p>
                <ul className={styles.serviceMenu}>
                  <li>音声認識 × 顧客管理（Whisper / GPT）</li>
                  <li>社内ドキュメントのRAGチャットボット構築</li>
                  <li>GAS / API による業務自動化</li>
                </ul>
                <a
                  href="https://flying-glazer-dfd.notion.site/LINE-33091932982b805c9ed4c647158642a1?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.serviceLink}
                >
                  事例を見る →
                </a>
              </div>
            </div>

            {/* 03 */}
            <div className={styles.serviceItem}>
              <div className={styles.serviceImgWrap}>
                <div className={styles.serviceImgPlaceholder}>
                  <img src="/images/golfth.png" alt="LINE構築" className={styles.serviceImg} />
                </div>
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.serviceNum}>03</div>
                <h3 className={styles.serviceHeading}>LINE構築（Lステップ・エルメ）</h3>
                <p className={styles.serviceDesc}>友だち追加から成約まで、LINE内の導線を設計・自動化します。</p>
                <ul className={styles.serviceMenu}>
                  <li>アカウント初期構築・初期設定</li>
                  <li>リッチメニュー / フォーム / タグ設計・分岐</li>
                  <li>ステップ配信・診断コンテンツ制作</li>
                </ul>
                <a
                  href="https://flying-glazer-dfd.notion.site/LINE-34991932982b8072898bc2df9daed841?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.serviceLink}
                >
                  事例を見る →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            3. 実績（信頼シグナル）
        ════════════════════════════════════ */}
        <section id="achievements" className={`${styles.section} ${styles.sectionDark}`} ref={addSectionRef(1)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>Track Record</div>
            <h2 className={styles.sectionTitle}>実績</h2>
            <div className={styles.achieveGrid}>
              {ACHIEVEMENTS.map((a, i) => (
                <div key={i} className={styles.achieveCard}>
                  <div className={styles.achieveCompany}>{a.company}</div>
                  <div className={styles.achieveDetail}>{a.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            4. 事例
        ════════════════════════════════════ */}
        <section id="cases" className={styles.section} ref={addSectionRef(2)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>Case Studies</div>
            <h2 className={styles.sectionTitle}>課題 → 施策 → 結果</h2>
            <div className={styles.caseGrid}>
              {CASES.map((c) => (
                <article key={c.id} className={`${styles.caseCard} ${c.featured ? styles.caseCardFeatured : ''}`}>
                  {c.featured && <div className={styles.caseFeaturedBadge}>代表作</div>}
                  <h3 className={styles.caseTitle}>{c.title}</h3>
                  <dl className={styles.caseDl}>
                    <dt className={styles.caseDt}>課題</dt>
                    <dd className={styles.caseDd}>{c.challenge}</dd>
                    <dt className={styles.caseDt}>施策</dt>
                    <dd className={styles.caseDd}>{c.approach}</dd>
                    <dt className={styles.caseDt}>結果</dt>
                    <dd className={`${styles.caseDd} ${styles.caseDdResult}`}>{c.result}</dd>
                  </dl>
                  <div className={styles.caseTags}>
                    {c.tags.map((t) => (
                      <span key={t} className={styles.caseTag}>{t}</span>
                    ))}
                  </div>
                  {c.featured && <ArchDiagram />}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.caseLink}
                  >
                    詳細を見る →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            5. PROFILE
        ════════════════════════════════════ */}
        <section id="profile" className={`${styles.section} ${styles.sectionDark}`} ref={addSectionRef(3)}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>Profile</div>
            <h2 className={styles.sectionTitle}>PROFILE</h2>
            <div className={styles.profileWrap}>
              <div className={styles.profileImgWrap}>
                <img src="/images/about.JPG" alt="石川悠起" className={styles.profileImg} />
              </div>
              <div className={styles.profileContent}>
                <p className={styles.profileName}>石川 悠起</p>
                <p className={styles.profileRole}>フリーランス Web エンジニア</p>
                <p className={styles.profileBio}>
                  「品質管理の視点」×「エンジニアリング」。
                  <br />
                  作って終わりではなく、本番で動き続ける品質まで責任を持ちます。
                </p>
                <div className={styles.timeline}>
                  <div className={styles.tlItem}>
                    <div className={styles.tlDot} />
                    <div className={styles.tlBody}>
                      <div className={styles.tlDate}>2026〜</div>
                      <div className={styles.tlTitle}>フリーランス独立</div>
                      <div className={styles.tlDesc}>LINE構築・チャットボット・AI活用システムを提供</div>
                    </div>
                  </div>
                  <div className={styles.tlItem}>
                    <div className={styles.tlDot} />
                    <div className={styles.tlBody}>
                      <div className={styles.tlDate}>〜2024</div>
                      <div className={styles.tlTitle}>Algoage（チャットコマース系ITベンチャー）</div>
                      <div className={styles.tlDesc}>LINEチャットボット実装</div>
                    </div>
                  </div>
                  <div className={styles.tlItem}>
                    <div className={styles.tlDot} />
                    <div className={styles.tlBody}>
                      <div className={styles.tlDate}>2017〜2024</div>
                      <div className={styles.tlTitle}>アサヒ飲料株式会社</div>
                      <div className={styles.tlDesc}>品質管理7年。新商品の全国展開プロジェクトオーナー</div>
                    </div>
                  </div>
                </div>
                <div className={styles.profileSns}>
                  <a
                    href="https://x.com/hshkwx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.snsLink}
                  >
                    𝕏 @hshkwx
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            6. CONTACT
        ════════════════════════════════════ */}
        <section id="contact" className={styles.section} ref={addSectionRef(4)}>
          <div className={`${styles.sectionInner} ${styles.contactInner}`}>
            <div className={styles.sectionLabel}>Contact</div>
            <h2 className={styles.contactTitle}>お気軽にご相談ください</h2>
            <p className={styles.contactSub}>
              お問い合わせには原則24時間以内に返信します。
              <br />
              まずはどんな課題でも、気軽にメッセージをどうぞ。
            </p>
            <a href="/contact" className={styles.contactBtn}>
              お問い合わせフォームへ
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
