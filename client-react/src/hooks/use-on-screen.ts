import { useEffect } from "react";

export const useOnScreen = (
  node: HTMLElement | null,
  callback?: () => any,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    if (!callback || !node) {
      return;
    }

    const handleEntry: IntersectionObserverCallback = ([entry], observer) => {
      if (entry.isIntersecting) {
        if (callback) {
          callback();
        }

        observer.unobserve(entry.target);
      }
    };

    const observer = new IntersectionObserver(handleEntry, options);

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };
  }, [node]);
};
