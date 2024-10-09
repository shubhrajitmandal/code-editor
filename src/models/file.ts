export interface IFile {
  relativePath: string;
  name: string;
  pathType: string;
  depth: number;
  index: number;
  gitStatus: string | null;
  gitIgnored: boolean;
}
