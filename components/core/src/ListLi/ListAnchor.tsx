import clsx from "clsx";
import type { FC, HTMLProps } from "react";
import { forwardRef } from "react";

type ListLinkProps = HTMLProps<HTMLAnchorElement>;

export const ListAnchor: FC<ListLinkProps> = forwardRef(
  ({ href, children, className }, ref, ...rest) => {
    return (
      <li>
        <a
          ref={ref}
          href={href}
          className={clsx(
            "text-base text-contrast-medium hover:text-contrast-high",
            className,
          )}
          target="_blank"
          rel="noreferrer"
          {...rest}
        >
          {children}
        </a>
      </li>
    );
  },
);

ListAnchor.displayName = "ListAnchor";
