import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface FaqContextType {
  questionValue: string;
  setQuestionValue: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  resetQuestionValue: () => void;
  isLoading: boolean;
}

const FaqContext = createContext<FaqContextType | undefined>(undefined);

interface FaqProviderProps {
  children: ReactNode;
  initialQuestionQuery?: string;
}

export const FaqProvider = ({ children, initialQuestionQuery }: FaqProviderProps) => {
  const [questionValue, setQuestionValue] = useState(initialQuestionQuery ?? '');
  const [isLoading, setIsLoading] = useState(false);

  const resetQuestionValue = useCallback(() => setQuestionValue(''), []);

  return (
    <FaqContext.Provider
      value={{
        questionValue,
        setQuestionValue,
        resetQuestionValue,
        isLoading,
        setIsLoading,
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
