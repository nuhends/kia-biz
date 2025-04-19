import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';

interface NetworkErrorContextType {
  isNetworkErrorModalOpen: boolean;
  openNetworkErrorModal: () => void;
  closeNetworkErrorModal: () => void;
}

const NetworkErrorContext = createContext<NetworkErrorContextType | undefined>(undefined);

interface NetworkErrorProviderProps extends PropsWithChildren {}

export const NetworkErrorProvider = ({ children }: NetworkErrorProviderProps) => {
  const [isNetworkErrorModalOpen, setIsNetworkErrorModalOpen] = useState(false);

  const openNetworkErrorModal = () => {
    setIsNetworkErrorModalOpen(true);
  };

  const closeNetworkErrorModal = () => {
    setIsNetworkErrorModalOpen(false);
  };

  return (
    <NetworkErrorContext.Provider
      value={{
        isNetworkErrorModalOpen,
        openNetworkErrorModal,
        closeNetworkErrorModal,
      }}
    >
      {children}
    </NetworkErrorContext.Provider>
  );
};

export const useNetworkError = (): NetworkErrorContextType => {
  const context = useContext(NetworkErrorContext);
  if (context === undefined) {
    throw new Error('useNetworkError는 NetworkErrorProvider 내에서 사용해야 합니다');
  }
  return context;
};
