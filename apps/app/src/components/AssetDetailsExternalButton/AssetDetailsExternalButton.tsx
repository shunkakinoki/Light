import clsx from "clsx";
import type { FC, AnchorHTMLAttributes } from "react";

export type AssetDetailsExternalButtonProps =
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const AssetDetailsExternalButton: FC<
  AssetDetailsExternalButtonProps
> = ({ href, className, children, ...rest }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        className,
        "rounded border border-contrast-lower bg-bg p-3 text-base font-medium text-contrast-higher ring-offset-bg hover:bg-bg-light focus:ring-2 focus:ring-primary focus:ring-offset-2",
      )}
      {...rest}
    >
      {children}
    </a>
  );
};
