import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { IWorksheet, IFile } from '@/models';

interface IWorksheetContext {
  fileList: IFile[];
  setFileList: Dispatch<SetStateAction<IFile[]>>;
  activeFile: IWorksheet | null;
  setActiveFile: Dispatch<SetStateAction<IWorksheet | null>>;
  openWorksheets: IWorksheet[];
  setOpenWorksheets: Dispatch<SetStateAction<IWorksheet[]>>;
  worksheets: IWorksheet[];
  setWorksheets: Dispatch<SetStateAction<IWorksheet[]>>;
}

const contextDefaultValue: IWorksheetContext = {
  fileList: [],
  setFileList: () => {},
  activeFile: null,
  setActiveFile: () => {},
  openWorksheets: [],
  setOpenWorksheets: () => {},
  worksheets: [],
  setWorksheets: () => {},
};

export const WorksheetContext =
  createContext<IWorksheetContext>(contextDefaultValue);

export function WorksheetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fileList, setFileList] = useState<IFile[]>([]);
  const [activeFile, setActiveFile] = useState<IWorksheet | null>(null);
  const [openWorksheets, setOpenWorksheets] = useState<IWorksheet[]>([]);
  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);

  return (
    <WorksheetContext.Provider
      value={{
        fileList,
        setFileList,
        activeFile,
        setActiveFile,
        openWorksheets,
        setOpenWorksheets,
        worksheets,
        setWorksheets,
      }}
    >
      {children}
    </WorksheetContext.Provider>
  );
}
