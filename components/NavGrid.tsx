'use client';
import { useRouter } from 'next/navigation';
import ThreeCell from './ThreeCell';
import styles from './NavGrid.module.css';
import { runPageTransition } from './pageTransition';

const ROW1 = [
  { type: 'LP_WORKS' as const, label: 'LP WORKS', labelColor: '#222222', href: '/lp-works' },
  { type: 'PROFILE'  as const, label: 'PROFILE',  labelColor: '#222222', href: '/profile' },
  { type: 'CHATBOT'  as const, label: 'CHATBOT',  labelColor: '#222222', href: '/chatbot' },
];

const ROW2 = [
  { type: 'CONTACT'  as const, label: 'CONTACT',  labelColor: '#222222', href: '/contact' },
  { type: 'ABOUT'    as const, label: 'ABOUT',    labelColor: '#222222', href: '/about' },
];

interface Props {
  onHover: (label: string | null) => void;
}

export default function NavGrid({ onHover }: Props) {
  const router = useRouter();

  const handleNavigate = async (href: string) => {
    await runPageTransition();
    router.push(href);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {ROW1.map((item) => (
          <ThreeCell
            key={item.type}
            {...item}
            onNavigate={handleNavigate}
            onHover={onHover}
          />
        ))}
      </div>
      <div className={styles.rowCentered}>
        {ROW2.map((item) => (
          <ThreeCell
            key={item.type}
            {...item}
            onNavigate={handleNavigate}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
}
