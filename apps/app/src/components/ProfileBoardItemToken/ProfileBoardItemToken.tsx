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
      <td className="flex grow items-center border-b border-contrast-lower py-3 pl-4">
        {icon_url ? (
          <NextImage
            width={32}
            height={32}
            useBlur={false}
            src={icon_url}
            className="h-8 w-8 rounded-full border border-contrast-lower"
            alt={name}
          />
        ) : (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-contrast-lower bg-bg-light">
            <span className="overflow-hidden text-ellipsis text-xs leading-none text-contrast-low">
              {shortenName(name)}
            </span>
          </span>
        )}
        <p className="pl-4 font-medium text-contrast-medium">
          {name}{" "}
          <span className="font-normal text-contrast-low">({symbol})</span>
        </p>
      </td>
      <td className="flex shrink-0 items-center border-b border-contrast-lower py-3 text-contrast-medium">
        <p className="overflow-hidden text-ellipsis ">
          <span className="font-semibold">
            {separateFloat(Number(amount.toFixed(2)))}
          </span>{" "}
          {symbol}
        </p>
      </td>
      <td className="flex w-1/4 flex-initial shrink-0 items-center justify-end border-b border-contrast-lower py-3 pr-4 text-contrast-medium sm:w-1/5 md:w-1/6">
        <p className="overflow-hidden text-ellipsis">
          ${separateFloat(Number(value.toFixed(2)))}
        </p>
      </td>
    </tr>
  );
};
