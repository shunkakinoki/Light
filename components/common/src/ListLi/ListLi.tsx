import type { FC } from "react";

import { ListAnchor } from "./ListAnchor";
import { ListLink } from "./ListLink";

type ListLiProps = { external: boolean; href: string };

export const ListLi: FC<ListLiProps> = ({ external, href, children }) => {
  if (external) {
    return <ListAnchor href={href}>{children}</ListAnchor>;
  }

  return <ListLink href={href}>{children}</ListLink>;
};
