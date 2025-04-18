import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface FaqContextType {
  questionValue: string;
  setQuestionValue: (value: string) => void;
  resetQuestionValue: () => void;
}

const FaqContext = createContext<FaqContextType | undefined>(undefined);

interface FaqProviderProps {
  children: ReactNode;
  initialQuestionQuery?: string;
}

export const FaqProvider = ({ children, initialQuestionQuery }: FaqProviderProps) => {
  const [questionValue, setQuestionValue] = useState(initialQuestionQuery ?? '');

  const resetQuestionValue = useCallback(() => setQuestionValue(''), []);

  return (
    <FaqContext.Provider
      value={{
        questionValue,
        setQuestionValue,
        resetQuestionValue,
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
