import { useEffect, useLayoutEffect, useState } from "react";

export const useLockedBody = (initialLocked = false) => {
  const [locked, setLocked] = useState(initialLocked);

  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      );

    if (!locked) {
      return;
    }

    if (!isMobile) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    return () => {
      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }

      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
  }, [initialLocked]);
};
