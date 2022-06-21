import type { MutableRefObject } from "react";
import { useEffect, useState, useRef } from "react";

export const useHover = <T>(): [MutableRefObject<T>, boolean] => {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = (): void => {
    return setValue(true);
  };
  const handleMouseOut = (): void => {
    return setValue(false);
  };
  useEffect(() => {
    const node: any = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);
  return [ref, value];
};
