import clsx from "clsx";
import { LazyMotion, domAnimation, m } from "framer-motion";
import type { FC } from "react";
import { useReducer, useCallback } from "react";

import type { NetworkItemProps } from "@lightdotso/app/components/NetworkItem";
import { NetworkItem } from "@lightdotso/app/components/NetworkItem";
import type { NetworkItemExtraProps } from "@lightdotso/app/components/NetworkItemExtra";
import { NetworkItemExtra } from "@lightdotso/app/components/NetworkItemExtra";
import { NetworkStackLoading } from "@lightdotso/app/components/NetworkStackLoading";
import type { NetworkToolTipComponentProps } from "@lightdotso/app/components/NetworkTooltip";
import { NetworkTooltip } from "@lightdotso/app/components/NetworkTooltip";
import {
  NETWORK_STACK_NUMBER,
  MAXIMUM_NETWORK_STACK_NUMBER,
} from "@lightdotso/app/config/Networks";
import { useNetworks } from "@lightdotso/app/hooks/useNetworks";

const reducer = (state, action) => {
  switch (action.type) {
    case "show":
      return {
        ...state,
        activeId: action.payload.target.id,
        target: action.payload.target,
      };
    case "hide":
      return {
        ...state,
        activeId: null,
      };
    default:
      return state;
  }
};

const defaultState = { activeId: null, target: null, text: "" };

export type NetworkStackProps = Pick<NetworkToolTipComponentProps, "id"> &
  Pick<NetworkItemExtraProps, "address"> &
  Pick<NetworkItemProps, "useBlur"> & {
    hidden?: boolean;
    max?: boolean;
    disableLoading?: boolean;
  };

export const NetworkStack: FC<NetworkStackProps> = ({
  address,
  id,
  useBlur = true,
  hidden = false,
  max = false,
  disableLoading = false,
}) => {
  const [{ activeId, target }, dispatch] = useReducer(reducer, defaultState);
  const { networks, isLoading } = useNetworks(address);

  const select = useCallback(e => {
    dispatch({
      type: "show",
      payload: { target: e.currentTarget },
    });
  }, []);

  const hide = useCallback(e => {
    dispatch({
      type: "hide",
      payload: { target: e.currentTarget },
    });
  }, []);

  if (isLoading && !disableLoading) {
    return <NetworkStackLoading className={clsx(!max && "w-36")} />;
  }

  return (
    <div
      className={clsx(
        "flex flex-row bg-bg-dark rounded-full",
        networks?.length ? "py-1 pr-3 pl-2" : hidden ? "hidden" : "",
        max && "w-full",
      )}
      onMouseLeave={hide}
    >
      <LazyMotion features={domAnimation}>
        <NetworkTooltip id={address} activeId={activeId} target={target}>
          {networks && activeId === networks?.length.toString()
            ? "See More"
            : (networks && networks[activeId]?.name) ??
              (networks && networks[activeId]?.id) ??
              ""}
        </NetworkTooltip>
        <m.ul className="flex shrink justify-end">
          {!networks?.length && <div className="h-14 bg-inherit" />}
          {networks &&
            typeof networks[0] !== "undefined" &&
            networks?.slice(0, NETWORK_STACK_NUMBER).map((network, id) => {
              return (
                <NetworkItem
                  key={id}
                  useBlur={useBlur}
                  id={id.toString()}
                  network={network}
                  onMouseEnter={select}
                />
              );
            })}
          {networks?.length > NETWORK_STACK_NUMBER && (
            <NetworkItemExtra
              key={id}
              address={address}
              id={String(networks?.length)}
              length={
                networks?.length > MAXIMUM_NETWORK_STACK_NUMBER
                  ? MAXIMUM_NETWORK_STACK_NUMBER + NETWORK_STACK_NUMBER
                  : networks?.length
              }
              onMouseEnter={select}
            />
          )}
        </m.ul>
      </LazyMotion>
    </div>
  );
};
