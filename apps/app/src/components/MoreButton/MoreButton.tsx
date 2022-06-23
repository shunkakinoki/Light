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
        "py-3 text-base font-medium text-contrast-higher hover:bg-bg-light rounded border border-contrast-lower focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg",
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
