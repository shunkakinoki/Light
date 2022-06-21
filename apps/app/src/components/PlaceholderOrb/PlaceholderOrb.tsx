import clsx from "clsx";
import type { FC, InsHTMLAttributes } from "react";

import s from "./PlaceholderOrb.module.css";

export type PlaceholderOrbProps = {
  address: string;
} & InsHTMLAttributes<HTMLSpanElement>;

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "purple",
  "pink",
  "rose",
];

export const PlaceholderOrb: FC<PlaceholderOrbProps> = ({
  address,
  className,
}) => {
  const color = colors[address[41].charCodeAt(0) % colors.length];

  return (
    <span
      className={clsx(
        "inline-block overflow-hidden rounded-full",
        color === "gray" && s.gray,
        color === "red" && s.red,
        color === "orange" && s.orange,
        color === "yellow" && s.yellow,
        color === "green" && s.green,
        color === "teal" && s.teal,
        color === "cyan" && s.cyan,
        color === "sky" && s.sky,
        color === "blue" && s.blue,
        color === "indigo" && s.indigo,
        color === "purple" && s.purple,
        color === "pink" && s.pink,
        color === "rose" && s.rose,
        className,
      )}
    />
  );
};
