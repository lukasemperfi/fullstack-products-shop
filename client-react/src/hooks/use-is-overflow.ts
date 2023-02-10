import { RefObject, useLayoutEffect, useState } from "react";

export const useIsOverflow = (
  ref: RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void,
  axis: "x" | "y" = "x"
) => {
  const [isOverflow, setIsOverflow] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;

    const trigger = () => {
      if (!el) {
        return;
      }

      const axisObj = {
        x: el.scrollWidth > el.clientWidth,
        y: el.scrollHeight > el.clientHeight,
      };

      const hasOverflow = axisObj[axis];

      setIsOverflow(hasOverflow);

      if (callback) {
        callback(hasOverflow);
      }
    };

    trigger();

    window.addEventListener("resize", trigger);

    return () => window.removeEventListener("resize", trigger);
  }, [callback, ref]);

  return isOverflow;
};
