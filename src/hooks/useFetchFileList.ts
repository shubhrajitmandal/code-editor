import { useState } from 'react';
import fileData from '../data/list-files.json';
import { sleep } from '@/utils';
import { IFile } from '@/models';

interface IFileResponse {
  status: string;
  message: string;
  data: {
    files: IFile[];
  };
}

const getFiles = async () => {
  await sleep(1000);
  return fileData;
};

export const useFetchFileList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IFile[]>([]);

  getFiles().then((fileData: IFileResponse) => {
    setIsLoading(false);
    setData(fileData.data.files);
  });

  return { isLoading, data };
};
