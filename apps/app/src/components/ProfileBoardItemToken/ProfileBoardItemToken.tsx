import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";
import type { AssetToken } from "@lightdotso/app/types/asset";
import { separateFloat } from "@lightdotso/app/utils/separateFloat";
import { shortenName } from "@lightdotso/app/utils/shortenName";

export type ProfileBoardItemTokenProps = AssetToken;

export const ProfileBoardItemToken: FC<ProfileBoardItemTokenProps> = ({
  asset: { name, amount, symbol, value, icon_url },
}) => {
  return (
    <tr className="flex w-full">
      <td className="flex grow items-center py-3 pl-4 border-b border-contrast-lower">
        {icon_url ? (
          <NextImage
            width={32}
            height={32}
            useBlur={false}
            src={icon_url}
            className="w-8 h-8 rounded-full border border-contrast-lower"
            alt={name}
          />
        ) : (
          <span className="inline-flex justify-center items-center w-8 h-8 bg-bg-light rounded-full border border-contrast-lower">
            <span className="overflow-hidden text-xs leading-none text-contrast-low text-ellipsis">
              {shortenName(name)}
            </span>
          </span>
        )}
        <p className="pl-4 font-medium text-contrast-medium">
          {name}{" "}
          <span className="font-normal text-contrast-low">({symbol})</span>
        </p>
      </td>
      <td className="flex shrink-0 items-center py-3 text-contrast-medium border-b border-contrast-lower">
        <p className="overflow-hidden text-ellipsis ">
          <span className="font-semibold">
            {separateFloat(Number(amount.toFixed(2)))}
          </span>{" "}
          {symbol}
        </p>
      </td>
      <td className="flex flex-initial shrink-0 justify-end items-center py-3 pr-4 w-1/4 sm:w-1/5 md:w-1/6 text-contrast-medium border-b border-contrast-lower">
        <p className="overflow-hidden text-ellipsis">
          ${separateFloat(Number(value.toFixed(2)))}
        </p>
      </td>
    </tr>
  );
};
