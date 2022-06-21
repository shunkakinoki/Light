import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC, HTMLProps } from "react";
import { forwardRef } from "react";

type ListLinkProps = LinkProps & HTMLProps<HTMLAnchorElement>;

export const ListLink: FC<ListLinkProps> = forwardRef(
  ({ href, children, className }, ref, ...rest) => {
    return (
      <li>
        <Link passHref href={href}>
          <a
            ref={ref}
            className={clsx(
              "text-base text-contrast-medium hover:text-contrast-high",
              className,
            )}
            {...rest}
          >
            {children}
          </a>
        </Link>
      </li>
    );
  },
);

ListLink.displayName = "ListLink";
