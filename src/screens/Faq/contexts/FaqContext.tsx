import type { FaqListResponse } from '@/src/api/faq/schema';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { ReactNode } from 'react';

interface FaqContextType {
  faqData: FaqListResponse;
  isLoading: boolean;
  isRouting: boolean;
  questionValue: string;
  resetQuestionValue: () => void;
  setFaqData: Dispatch<SetStateAction<FaqListResponse>>;
  setQuestionValue: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsRouting: Dispatch<SetStateAction<boolean>>;
}

const FaqContext = createContext<FaqContextType | undefined>(undefined);

interface FaqProviderProps {
  children: ReactNode;
  initialFaqData: FaqListResponse;
  initialQuestionQuery?: string;
}

export const FaqProvider = ({
  children,
  initialFaqData,
  initialQuestionQuery,
}: FaqProviderProps) => {
  const [isRouting, setIsRouting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faqData, setFaqData] = useState<FaqListResponse>(initialFaqData);
  const [questionValue, setQuestionValue] = useState(initialQuestionQuery ?? '');

  const resetQuestionValue = useCallback(() => setQuestionValue(''), []);

  useEffect(() => {
    setFaqData(initialFaqData);
  }, [initialFaqData]);

  return (
    <FaqContext.Provider
      value={{
        faqData,
        isLoading,
        isRouting,
        questionValue,
        resetQuestionValue,
        setFaqData,
        setIsLoading,
        setIsRouting,
        setQuestionValue,
      }}
    >
      {children}
    </FaqContext.Provider>
  );
};

export const useFaqContext = () => {
  const context = useContext(FaqContext);
  if (context === undefined) {
    throw new Error('useFaqContext must be used within a FaqProvider');
  }
  return context;
};
