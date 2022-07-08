import clsx from "clsx";
import type { FC, ButtonHTMLAttributes } from "react";

export type MoreButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const MoreButton: FC<MoreButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        className,
        "rounded border border-contrast-lower py-3 text-base font-medium text-contrast-higher ring-offset-bg hover:bg-bg-light focus:ring-2 focus:ring-primary focus:ring-offset-2",
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
