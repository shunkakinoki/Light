import clsx from "clsx";
import type { FC } from "react";

type FollowGridLayoutProps = { className?: string };

export const FollowGridLayout: FC<FollowGridLayoutProps> = ({
  className,
  children,
}) => {
  return (
    <>
      <ul className={clsx(className, "grid grid-cols-1 lg:grid-cols-3 gap-6")}>
        {children}
      </ul>
    </>
  );
};
