import { useState } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface UseBodyScrollLockOptions {
  initialScrollLock?: boolean;
}

interface BodyScrollLockControls {
  lock: () => void;
  unlock: () => void;
}

export const useBodyScrollLock = (
  options: UseBodyScrollLockOptions = {},
): BodyScrollLockControls => {
  const { initialScrollLock = false } = options;
  const [isBodyScrollLock, setIsBodyScrollLock] = useState(initialScrollLock);

  useIsomorphicLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isBodyScrollLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isBodyScrollLock]);

  const lock = () => setIsBodyScrollLock(true);
  const unlock = () => setIsBodyScrollLock(false);

  return { lock, unlock };
};
