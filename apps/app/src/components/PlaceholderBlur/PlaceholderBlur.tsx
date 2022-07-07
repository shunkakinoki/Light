import clsx from "clsx";
import type { FC } from "react";

import s from "./PlaceholderBlur.module.css";

export const PlaceholderBlur: FC = () => {
  return (
    <div
      className={clsx(
        "absolute -inset-px rounded-full bg-primary opacity-0 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-500",
        s.transitionfix,
      )}
    />
  );
};
