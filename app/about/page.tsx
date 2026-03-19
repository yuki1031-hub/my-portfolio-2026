import SiteHeader from '../../components/SiteHeader';
import styles from './page.module.css';
import AboutClient from './AboutClient';

export default function About() {
  return (
    <div className={`${styles.page} pageEnter`}>
      <SiteHeader />

      <main className={styles.main}>
        {/* ─── ヒーロー画像 ─── */}
        <img
          src="/images/about.JPG"
          alt="プロフィール"
          className={styles.heroImg}
        />

        {/* ─── WHO AM I ─── */}
        <section className={styles.section}>
          <p className={styles.text}>
            LINEチャットボット実装・Lステップ・LP制作を中心に活動するフリーランスエンジニアです。
          </p>
        </section>

        {/* ─── CAREER ─── */}
        <section className={styles.section}>
          <div className={styles.timeline}>
             <div className={styles.timelineItem}>
              <div className={styles.timelineDate}>2026〜</div>
              <div className={styles.timelineDetail}>
                <div className={styles.timelineTitle}>フリーランス独立</div>
                <p className={styles.timelineDesc}>
                  LINE構築・チャットボット制作をフリーランスとして提供中。
                </p>
              </div>
            </div>
             <div className={styles.timelineItem}>
              <div className={styles.timelineDate}>〜2024</div>
              <div className={styles.timelineDetail}>
                <div className={styles.timelineTitle}>チャットコマース系ITベンチャー</div>
                <p className={styles.timelineDesc}>
                  LINEチャットボット実装
                </p>
              </div>
            </div>
           
            <div className={styles.timelineItem}>
              <div className={styles.timelineDate}>2017〜2024</div>
              <div className={styles.timelineDetail}>
                <div className={styles.timelineTitle}>アサヒ飲料株式会社</div>
                <p className={styles.timelineDesc}>
                  プロジェクトオーナーとして新商品の全国展開
                </p>
              </div>
            </div>
           
          </div>
        </section>
      </main>

      <AboutClient />
    </div>
  );
}
