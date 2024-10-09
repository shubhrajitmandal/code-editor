import { useEffect, useContext } from 'react';
import Editor, { DiffEditor, OnChange } from '@monaco-editor/react';
import { useFetchWorksheets } from '@/hooks';
import { IWorksheet } from '@/models';
import { fileTypeMappings } from '@/utils';
import { WorksheetContext, ThemeContext } from '@/context';
import type { TEditor } from '@/components';

import styles from './editor.module.css';

interface ICodeEditorProps {
  editorType: TEditor;
  handleEditorChange: OnChange;
}

const editorThemeMapping: {
  [key: string]: string;
} = {
  light: 'vs-light',
  dark: 'vs-dark',
  purple: 'vs-light',
  grey: 'vs-dark',
};

export function CodeEditor({
  editorType,
  handleEditorChange,
}: ICodeEditorProps) {
  const {
    activeFile,
    setActiveFile,
    openWorksheets,
    setWorksheets,
    setOpenWorksheets,
  } = useContext(WorksheetContext);
  const { theme } = useContext(ThemeContext);

  const { isLoading, data } = useFetchWorksheets();

  useEffect(() => {
    setActiveFile(data[0]);
    setWorksheets(data);
    setOpenWorksheets(data);
  }, [isLoading]);

  const getFileExtention = (filename: string) => {
    const splittedFilename = filename.split('.');
    return splittedFilename[splittedFilename.length - 1];
  };

  const handleCloseWorksheet = (
    event: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    event.stopPropagation();
    const updatedWorksheets = openWorksheets?.filter(
      (ws) => ws.index !== index
    ) as IWorksheet[];
    if (activeFile?.index === index) {
      setActiveFile(updatedWorksheets[0]);
    }
    setOpenWorksheets(updatedWorksheets);
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
      <div className={styles['tab-container']}>
        {openWorksheets?.map((worksheet) => {
          const isActive = worksheet.name === activeFile?.name;

          return (
            <div
              key={worksheet.index}
              className={`${styles.tab} ${isActive && styles.active}`}
              onClick={() =>
                setActiveFile(
                  openWorksheets.find(
                    (item) => item.name === worksheet.name
                  ) as IWorksheet
                )
              }
            >
              {worksheet.name}{' '}
              <span
                className={styles.close}
                onClick={(e) => handleCloseWorksheet(e, worksheet.index)}
              >
                &#x2715;
              </span>
            </div>
          );
        })}
      </div>
      {activeFile && (
        <div className={styles['relative-path']}>
          {activeFile?.relativePath}
        </div>
      )}

      {editorType === 'normal' ? (
        <Editor
          className={styles.editor}
          theme={editorThemeMapping[theme]}
          defaultLanguage={
            fileTypeMappings[
              getFileExtention(activeFile?.name ?? '') || 'javascript'
            ]
          }
          defaultValue={activeFile?.modifiedContent ?? ''}
          path={activeFile?.relativePath}
          onChange={handleEditorChange}
        />
      ) : (
        <DiffEditor
          className={styles.editor}
          theme={editorThemeMapping[theme]}
          language={
            fileTypeMappings[
              getFileExtention(activeFile?.name ?? '') || 'javascript'
            ]
          }
          original={activeFile?.editorContent ?? ''}
          modified={activeFile?.modifiedContent ?? ''}
        />
      )}
    </div>
  );
}
