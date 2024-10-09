import { useState, useEffect } from 'react';
import { useFetchBranches } from '@/hooks';

import styles from './branches.module.css';
import { IBranchData } from '@/models';

export function Branches() {
  const [activeBranch, setActiveBranch] = useState<string>('');
  const { isLoading, data: branches } = useFetchBranches();

  useEffect(() => {
    setActiveBranch(branches?.['currentBranch'] as string);
  }, [isLoading]);

  const handleSetBranch = (branch: string) => {
    setActiveBranch(branch);
  };
  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loader}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles['branch-container']}>
        {Object.entries(branches as IBranchData).map(([item, value]) => (
          <Branch
            key={item}
            name={item}
            value={value}
            activeBranch={activeBranch}
            handleSetBranch={handleSetBranch}
          />
        ))}
      </div>
    </div>
  );
}

interface IBranchProps {
  activeBranch: string;
  handleSetBranch: (branch: string) => void;
  name: string;
  value: string | string[];
}

const Branch = ({
  activeBranch,
  handleSetBranch,
  name,
  value,
}: IBranchProps) => {
  return (
    <div>
      <div className={styles.branch}>
        <span className={`${styles.branchicon}`}>&gt;</span>
        <span className={styles.bold}>{name}</span>
      </div>
      {
        <div className={styles.child}>
          {Array.isArray(value) ? (
            value.map((branchName) => (
              <div
                className={styles.branchname}
                onClick={() => handleSetBranch(branchName)}
              >
                {branchName}
              </div>
            ))
          ) : (
            <div className={`${styles.branchname} ${styles.active}`}>
              {activeBranch}
            </div>
          )}
        </div>
      }
    </div>
  );
};
