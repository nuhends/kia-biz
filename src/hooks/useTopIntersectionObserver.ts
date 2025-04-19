import { useEffect } from 'react';

interface UseTopIntersectionObserverProps {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
}

const useTopIntersectionObserver = ({
  callback,
  options = {},
}: UseTopIntersectionObserverProps) => {
  useEffect(() => {
    const topAnchor = document.getElementById('top-anchor');

    if (!topAnchor) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(topAnchor);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);
};

export default useTopIntersectionObserver;
