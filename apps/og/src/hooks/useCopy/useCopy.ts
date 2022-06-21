import copy from "copy-to-clipboard";
import { useRef, useState } from "react";

export const useCopy = (): [boolean, (text: string) => void] => {
  const [showCopied, setShowCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copyText = (text: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    copy(text);
    setShowCopied(true);

    if (timeoutRef.current != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clearTimeout(timeoutRef.current);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    timeoutRef.current = setTimeout(() => {
      setShowCopied(false);
      timeoutRef.current = null;
    }, 1500);
  };

  return [showCopied, copyText];
};
