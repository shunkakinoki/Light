import clsx from "clsx";
import type { FC, AnchorHTMLAttributes } from "react";

export type NetworkHeroExternalButtonProps =
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const NetworkHeroExternalButton: FC<NetworkHeroExternalButtonProps> = ({
  href,
  className,
  children,
  ...rest
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        className,
        "md:p-3 py-2 px-3 text-base font-medium text-contrast-higher bg-bg hover:bg-bg-light rounded border border-contrast-lower focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg",
      )}
      {...rest}
    >
      {children}
    </a>
  );
};
