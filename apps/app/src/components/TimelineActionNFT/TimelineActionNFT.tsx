import { SparklesIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import type { OpenseaEvent } from "@lightdotso/types";
import Link from "next/link";
import type { FC } from "react";
import { useMemo } from "react";

import type { TimelineListItemProps } from "@lightdotso/app/components/TimelineListItem";
import { ZERO_WALLET_ADDRESS } from "@lightdotso/app/config/Default";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export type TimelineActionNFTProps = {
  data: OpenseaEvent;
} & TimelineListItemProps;

export const TimelineActionNFT: FC<TimelineActionNFTProps> = ({ data }) => {
  const address = useMemo(() => {
    if (data?.to_account?.address) {
      return data?.to_account?.address;
    }
  }, [data?.to_account?.address]);

  const { ens } = useEns(address);

  const slug = useMemo(() => {
    if (ens) {
      return ens;
    }
    if (address) {
      return splitAddress(address);
    }
  }, [ens, address]);

  return (
    <>
      {data?.event_type === "approve" ? (
        <>
          Approved{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "cancelled" ? (
        <>
          Cancelled{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "created" ? (
        <>
          Created{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "bid_entered" ? (
        <>
          Entered Bid{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "bid_withdrawn" ? (
        <>
          Withdrew Bid{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "offer_entered" ? (
        <>
          Entered Offer{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
          for{" "}
          <span className="text-sm font-semibold text-contrast-higher">
            {data?.bid_amount / 10 ** data?.payment_token.decimals}{" "}
            {data?.payment_token?.symbol}
          </span>
          <span className="text-sm font-medium text-contrast-high">
            (${data?.payment_token?.usd_price.slice(0, 6)})
          </span>
        </>
      ) : data?.event_type === "successful" &&
        data?.from_account?.address === ZERO_WALLET_ADDRESS ? (
        <>
          Success{" "}
          <SparklesIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "transfer" &&
        data?.from_account?.address === ZERO_WALLET_ADDRESS ? (
        <>
          Minted{" "}
          <SparklesIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : data?.event_type === "transfer" ? (
        <>
          Transferred{" "}
          <SparklesIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      ) : (
        <>
          Something{" "}
          <ChevronDoubleRightIcon className="inline-block w-4 h-4 fill-contrast-higher" />{" "}
        </>
      )}
      <Link
        passHref
        href={`/asset/nft/${data?.asset?.asset_contract?.address}/${data?.asset?.token_id}`}
      >
        <a className="overflow-hidden text-sm font-normal text-contrast-high hover:underline text-ellipsis break-all">
          {data?.asset?.name}
        </a>
      </Link>
      &nbsp;
      {slug && (
        <>
          <span className="text-sm text-contrast-low">to</span>
          &nbsp;
          <Link passHref href={`/${address}`}>
            <a className="overflow-hidden text-sm font-normal text-contrast-high hover:underline text-ellipsis break-all">
              {slug}
            </a>
          </Link>
        </>
      )}
    </>
  );
};
