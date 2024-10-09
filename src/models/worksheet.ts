export interface IWorksheet {
  relativePath: string;
  name: string;
  pathType: string;
  depth: number;
  index: number;
  gitStatus: string | null;
  editorContent: string;
  modifiedContent: string;
  gitIgnored: boolean;
  worksheetType: string;
  repositoryId: string;
  branch: string;
  role: string;
  warehouse: string;
  content: string;
}
