import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC, HTMLProps } from "react";
import { forwardRef } from "react";

type HeaderMenuLinkProps = LinkProps & HTMLProps<HTMLAnchorElement>;

export const HeaderMenuLink: FC<HeaderMenuLinkProps> = forwardRef(
  ({ href, children, className }, ref, ...rest) => {
    return (
      <Link passHref href={href}>
        <a ref={ref} className={className} {...rest}>
          {children}
        </a>
      </Link>
    );
  },
);

HeaderMenuLink.displayName = "HeaderHeaderMenuLink";
