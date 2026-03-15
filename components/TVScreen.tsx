'use client';
import styles from './TVScreen.module.css';

interface Props {
  hoveredSection: string | null;
}

export default function TVScreen({ hoveredSection }: Props) {
  const isDefault = hoveredSection === null;

  return (
    <div className={styles.miniBezel}>
      <div className={styles.tvScreen}>
        <div className={styles.scanlines} />
        {isDefault ? (
          <span key="default" className={styles.pressStart}>
            ▶ PRESS START
          </span>
        ) : (
          <span key={hoveredSection} className={styles.worksText}>
            {hoveredSection}
          </span>
        )}
      </div>
    </div>
  );
}
