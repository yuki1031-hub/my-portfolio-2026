'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './Bezel.module.css';

const FloatingDots = dynamic(() => import('./FloatingDots'), { ssr: false });

export default function Bezel({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.bezel}>
      <div className={styles.screen}>
        {mounted && !isHome && <FloatingDots />}
        {children}
      </div>
      <div className={styles.bezelBottom}>
        <div className={styles.bezelHeader}>
          <div className={styles.bezelLogo}>HISHIKAWA.Y</div>
          <div className={styles.dotMatrix}>DOT MATRIX WITH STEREO SOUND</div>
        </div>
        <div className={styles.controls}>
          <div className={styles.dpad} />
          <div className={styles.centerControls}>
            <div className={styles.smallBtns}>
              <div className={styles.smallBtn}>SELECT</div>
              <div className={styles.smallBtn}>START</div>
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.btnCircle}>B</div>
            <div className={styles.btnCircle}>A</div>
          </div>
        </div>
      </div>
    </div>
  );
}
