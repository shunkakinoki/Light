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
      <div className="relative flex w-full items-center">
        <select
          ref={forwardedRef}
          className={clsx(
            "h-9 w-full appearance-none rounded border bg-contrast-higher py-1 pr-8 pl-3 text-contrast-lower",
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
