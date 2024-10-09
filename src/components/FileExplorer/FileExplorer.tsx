import { useContext, useEffect } from 'react';
import { useFetchFileList } from '@/hooks';
import { IFile } from '@/models';
import { File } from '@/components';
import { WorksheetContext } from '@/context';
import styles from './explorer.module.css';

export function FileExplorer() {
  const { isLoading, data: files } = useFetchFileList();

  const { fileList, setFileList } = useContext(WorksheetContext);

  useEffect(() => {
    setFileList(files);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loader}>Loading...</p>
      </div>
    );
  }

  const root = files.find((item) => item.depth === 0);

  return (
    <div className={styles.container}>
      <div className={styles['file-container']}>
        <File
          files={fileList}
          item={root as IFile}
          relPath={`${(root as IFile).name}`}
        />
      </div>
    </div>
  );
}
