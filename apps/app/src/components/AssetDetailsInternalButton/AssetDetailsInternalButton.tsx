import clsx from "clsx";
import Link from "next/link";
import type { FC, AnchorHTMLAttributes } from "react";

export type AssetDetailsInternalButtonProps =
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const AssetDetailsInternalButton: FC<
  AssetDetailsInternalButtonProps
> = ({ href, className, children, ...rest }) => {
  return (
    <Link passHref href={href}>
      <a
        target="_parent"
        className={clsx(
          className,
          "rounded border border-contrast-lower bg-bg p-3 text-base font-medium text-contrast-higher ring-offset-bg hover:bg-bg-light focus:ring-2 focus:ring-primary focus:ring-offset-2",
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};
