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
        "group relative flex items-center space-x-3 rounded-lg border border-contrast-lower py-4 px-6 shadow-sm hover:border-contrast-low hover:bg-contrast-lower focus:border-transparent focus:ring-2 focus:ring-primary-light focus:ring-offset-2",
        disabled && "cursor-not-allowed opacity-30",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="mr-3 shrink-0 group-hover:animate-pulse">{children}</div>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-left text-base font-medium leading-6 text-contrast-high">
            {name}
          </p>
        </div>
      </div>
    </button>
  );
};
