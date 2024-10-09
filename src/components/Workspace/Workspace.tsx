import { useState, useContext } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { WorksheetContext } from '@/context';
import { FileExplorer, Branches, CodeEditor, Header } from '@/components';
import 'react-reflex/styles.css';
import styles from './workspace.module.css';
import { OnChange } from '@monaco-editor/react';
import { IWorksheet } from '@/models';

type TMenuOptions = 'explorer' | 'branches';
export type TEditor = 'normal' | 'diff';

export function Workspace() {
  const [sideMenu, setSideMenu] = useState<TMenuOptions>('explorer');
  const [editorType, setEditorType] = useState<TEditor>('normal');

  const { activeFile, worksheets, setWorksheets, setActiveFile } =
    useContext(WorksheetContext);

  const toggleEditor = () => {
    if (editorType === 'normal') {
      setEditorType('diff');
    } else {
      setEditorType('normal');
    }
  };

  const handleEditorChange: OnChange = (value) => {
    const updatedFile = { ...activeFile, modifiedContent: value } as IWorksheet;
    setWorksheets([
      ...worksheets.filter(
        (worksheet) => worksheet.index !== activeFile?.index
      ),
      updatedFile,
    ]);
    setActiveFile(updatedFile);
  };

  return (
    <>
      <Header toggleDiffEditor={toggleEditor} />
      <ReflexContainer
        orientation="vertical"
        className={styles['editor-container']}
      >
        <ReflexElement flex={2} minSize={20} className={styles['left-pane']}>
          <div className={styles.menu}>
            <button
              className={sideMenu === 'explorer' ? styles.active : ''}
              onClick={() => setSideMenu('explorer')}
            >
              Explorer
            </button>
            <button
              className={sideMenu === 'branches' ? styles.active : ''}
              onClick={() => setSideMenu('branches')}
            >
              Branches
            </button>
          </div>
          {sideMenu === 'explorer' ? <FileExplorer /> : <Branches />}
        </ReflexElement>

        <ReflexSplitter className={styles.splitter} />

        <ReflexElement flex={7} minSize={100} className={styles['middle-pane']}>
          <CodeEditor
            editorType={editorType}
            handleEditorChange={handleEditorChange}
          />
        </ReflexElement>
      </ReflexContainer>
    </>
  );
}
