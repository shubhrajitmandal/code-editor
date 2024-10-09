import { useState, useContext, useRef, useEffect } from 'react';
import { FaGreaterThan } from 'react-icons/fa6';
import { RiFolderAddFill, RiFileAddFill } from 'react-icons/ri';
import { IFile, IWorksheet } from '@/models';
import { WorksheetContext } from '@/context';
import styles from './file.module.css';

interface IFileProps {
  files: IFile[];
  item: IFile;
  relPath: string;
}

type TItemType = 'file' | 'directory';

export function File({ files, item, relPath }: IFileProps) {
  const fileNameInputRef = useRef<HTMLInputElement | null>(null);

  const [isOpened, setIsOpened] = useState(false);
  const [addItem, setAddItem] = useState<TItemType | null>(null);
  const [name, setName] = useState('');

  const {
    fileList,
    setFileList,
    setActiveFile,
    worksheets,
    openWorksheets,
    setOpenWorksheets,
  } = useContext(WorksheetContext);

  const childrens = files
    .filter((file) => {
      const pathArray = file.relativePath.split('/');
      const parent = pathArray[pathArray.length - 2];

      if (parent === item.name) return file;
    })
    .reduce(
      (acc, curr) => {
        if (curr.pathType === 'directory') {
          acc[0].push(curr);
        } else {
          acc[1].push(curr);
        }
        return acc;
      },
      [[], []] as IFile[][]
    )
    .flatMap((arr) => arr.sort((a, b) => a.name.localeCompare(b.name)));

  useEffect(() => {
    if (fileNameInputRef.current) {
      fileNameInputRef.current.focus();
    }
  }, [addItem]);

  const handleClick = (item: IFile) => {
    if (isOpened) {
      setAddItem(null);
    }
    setIsOpened(!isOpened);

    if (item.pathType === 'file') {
      const worksheet = worksheets.find((ws) => ws.index === item.index);
      setActiveFile(worksheet ?? ({ ...item } as IWorksheet));
      if (!openWorksheets?.find((ws) => ws.index === item.index)) {
        setOpenWorksheets([
          ...(openWorksheets as IWorksheet[]),
          worksheet ?? ({ ...item } as IWorksheet),
        ]);
      }
    }
  };

  const handleAddFile = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setAddItem('file');
    setIsOpened(true);
  };

  const handleAddFolder = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setAddItem('directory');
    setIsOpened(true);
  };

  const handleCreate = () => {
    const item: IFile = {
      relativePath: `${relPath}/${name}`,
      name: name,
      pathType: addItem as TItemType,
      depth: relPath.split('/').length,
      index: fileList.length,
      gitStatus: null,
      gitIgnored: false,
    };
    setFileList([...fileList, item]);
    setAddItem(null);
    setName('');
  };

  return (
    <>
      <div>
        <div className={styles.filename} onClick={() => handleClick(item)}>
          <div className={styles.wrapper}>
            {item.pathType === 'directory' && (
              <span
                className={`${styles.fileicon} ${isOpened && styles.rotate90}`}
              >
                <FaGreaterThan size={12} />
              </span>
            )}
            <span className={item.pathType === 'directory' ? styles.bold : ''}>
              {item.name}
            </span>
          </div>
          {item.pathType === 'directory' && (
            <div className={styles.wrapper} style={{ marginLeft: '12px' }}>
              <span
                className={styles['action-icon']}
                onClick={(e) => handleAddFolder(e)}
              >
                <RiFolderAddFill size={18} />
              </span>
              <span
                className={styles['action-icon']}
                onClick={(e) => handleAddFile(e)}
              >
                <RiFileAddFill size={18} />
              </span>
            </div>
          )}
        </div>
        <div className={styles.child}>
          {(addItem === 'file' || addItem === 'directory') && isOpened && (
            <div className={styles['name-input']}>
              <input
                type="text"
                ref={fileNameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleCreate}>Create</button>
            </div>
          )}
        </div>
        {childrens.length > 0 && isOpened && (
          <div className={styles.child}>
            {childrens.map((subitem) => (
              <File
                key={subitem.index}
                files={files}
                item={subitem}
                relPath={`${relPath}/${subitem.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
