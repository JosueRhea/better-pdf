import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { type Doc } from '../services/types';
import { getDocs, saveDocs } from '../services/pdf';

interface PdfContextProps {
  docs: Doc[];
  addNewDoc: (newDoc: Doc) => Promise<void>;
}

const PdfContext = createContext<PdfContextProps>({
  docs: [],
  addNewDoc: async () => {},
});

export function usePdfs() {
  return useContext(PdfContext);
}

export const PdfProvider: FC<PropsWithChildren> = ({ children }) => {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    getDocs().then((docs) => {
      if (docs.data) {
        setDocs(docs.data);
      }
    });
  }, []);

  const addNewDoc = async (newDoc: Doc) => {
    const newDocs = [newDoc, ...docs];
    const result = await saveDocs(newDocs);
    if (result.success) {
      setDocs(newDocs);
    }
  };

  return (
    <PdfContext.Provider value={{ docs, addNewDoc }}>
      {children}
    </PdfContext.Provider>
  );
};
