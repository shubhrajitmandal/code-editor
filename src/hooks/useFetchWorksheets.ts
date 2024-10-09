import { useState } from 'react';
import worksheetData from '../data/open-worksheets.json';
import { sleep } from '@/utils';
import { IWorksheet } from '@/models';

interface IWorksheetResponse {
  activeWorksheets: IWorksheet[];
}

const getWorksheets = async () => {
  await sleep(1000);
  return worksheetData;
};

export const useFetchWorksheets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IWorksheet[]>([]);

  getWorksheets().then((worksheetData: IWorksheetResponse) => {
    setIsLoading(false);
    setData(worksheetData.activeWorksheets);
  });

  return { isLoading, data };
};
