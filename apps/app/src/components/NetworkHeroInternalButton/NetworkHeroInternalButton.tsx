import clsx from "clsx";
import Link from "next/link";
import type { FC, AnchorHTMLAttributes } from "react";

export type NetworkHeroInternalButtonProps =
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const NetworkHeroInternalButton: FC<NetworkHeroInternalButtonProps> = ({
  href,
  className,
  children,
  ...rest
}) => {
  return (
    <Link passHref href={href}>
      <a
        href={href}
        className={clsx(
          className,
          "md:p-3 py-2 px-3 text-base font-medium text-contrast-higher bg-bg hover:bg-bg-light rounded border border-contrast-lower focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg",
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};
