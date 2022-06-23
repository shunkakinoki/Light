import clsx from "clsx";
import type { FC } from "react";

import s from "./Center.module.css";

export const Center: FC = ({ children }) => {
  return (
    <div className="w-full">
      <div className={clsx("flex flex-col justify-center items-center", s.fit)}>
        {children}
      </div>
    </div>
  );
};
