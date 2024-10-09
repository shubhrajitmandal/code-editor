'use client';
import styles from './page.module.css';

import { Workspace } from '@/components';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles['content-container']}>
        <Workspace />
      </div>
    </div>
  );
}
