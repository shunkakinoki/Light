import clsx from "clsx";
import { forwardRef } from "react";

export interface Option {
  value: string;
  text?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: Option[];
  className?: string;
  value?: string;
  width?: string;
  name?: string;
  error?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void | undefined;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, value, options, name, error, disabled, onChange, ...rest },
    forwardedRef,
  ) => {
    return (
      <div className="flex relative items-center w-full">
        <select
          ref={forwardedRef}
          className={clsx(
            "py-1 pr-8 pl-3 w-full h-9 text-contrast-lower bg-contrast-higher rounded border appearance-none",
            error ? "border-red-500 hover:border-red-500" : "",
            className,
          )}
          value={value}
          disabled={disabled}
          name={name}
          onChange={e => {
            if (onChange != null) {
              onChange(e.target.value);
            }
          }}
          {...rest}
        >
          {options.map(option => {
            return (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.text ?? option.value}
              </option>
            );
          })}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";
