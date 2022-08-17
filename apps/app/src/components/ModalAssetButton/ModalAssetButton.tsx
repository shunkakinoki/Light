import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import type { FC } from "react";

export type ModalAssetButtonProps = { src: string };

export const ModalAssetButton: FC<ModalAssetButtonProps> = ({ src }) => {
  return (
    <Link href={src}>
      <a className="transition duration-150 ease-in-out focus:outline-none">
        <ArrowRightIcon className="h-6 w-6 text-contrast-higher hover:text-contrast-medium" />
      </a>
    </Link>
  );
};
