'use client';
import { useState } from 'react';
import TVScreen from '../components/TVScreen';
import NavGrid from '../components/NavGrid';
import styles from './page.module.css';

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <div className={styles.tvWrap}>
          <TVScreen hoveredSection={hoveredSection} />
        </div>
        <NavGrid onHover={setHoveredSection} />
      </main>

      <footer className={styles.footer}>
        <span>© 2026 HISHIKAWA.Y</span>
      </footer>
    </div>
  );
}
