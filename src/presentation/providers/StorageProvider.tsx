import { container } from '../../common/Container';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import IStorage from '../../infrastructure/contracts/IStorage';

type StorageContextValue = {
  storage: IStorage;
};

const StorageContext = createContext<StorageContextValue | null>(null);
export const useStorage = () => {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error('Storage not provided');
  return ctx;
};

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo<StorageContextValue>(
    () => ({
      storage: container.resolve('STORAGE'),
    }),
    [],
  );

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
