import { useState } from 'react';
import branchData from '../data/branches.json';
import { sleep } from '@/utils';
import { IBranchData } from '@/models';

interface IBranchResponse {
  status: string;
  message: string;
  data: IBranchData;
}

const getBranches = async () => {
  await sleep(1000);
  return branchData;
};

export const useFetchBranches = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IBranchData | null>(null);

  getBranches().then((branchData: IBranchResponse) => {
    setIsLoading(false);
    setData(branchData.data);
  });

  return { isLoading, data };
};
