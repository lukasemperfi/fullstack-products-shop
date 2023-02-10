import { useEffect } from "react";

export type Handler = (event: MouseEvent) => void;

export const useOutsideClick = (el: HTMLElement | null, handler: Handler) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (el && !el.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [el]);
};
