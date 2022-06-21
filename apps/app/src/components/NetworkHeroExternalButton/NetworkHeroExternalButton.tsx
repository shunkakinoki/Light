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
        "rounded border border-contrast-lower bg-bg py-2 px-3 text-base font-medium text-contrast-higher ring-offset-bg hover:bg-bg-light focus:ring-2 focus:ring-primary focus:ring-offset-2 md:p-3",
      )}
      {...rest}
    >
      {children}
    </a>
  );
};
