import clsx from "clsx";
import type { FC, MouseEventHandler } from "react";

export type WalletBarProps = {
  disabled: boolean;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const WalletBar: FC<WalletBarProps> = ({
  name,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "group flex relative items-center py-4 px-6 space-x-3 hover:bg-contrast-lower rounded-lg border border-contrast-lower hover:border-contrast-low focus:border-transparent focus:ring-2 focus:ring-primary-light focus:ring-offset-2 shadow-sm",
        disabled && "opacity-30 cursor-not-allowed",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="shrink-0 mr-3 group-hover:animate-pulse">{children}</div>
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-base font-medium leading-6 text-left text-contrast-high">
            {name}
          </p>
        </div>
      </div>
    </button>
  );
};
