'use client';
import { useRouter } from 'next/navigation';
import { runPageTransition } from '../../components/pageTransition';
import styles from './page.module.css';

export default function AboutClient() {
  const router = useRouter();

  const handleBack = async () => {
    await runPageTransition();
    router.push('/');
  };

  return (
    <footer className={styles.foot}>
      <button className={styles.backBtn} onClick={handleBack}>
        ← BACK
      </button>
    </footer>
  );
}
