import clsx from "clsx";
import type { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<InputProps> = props => {
  const { className, onChange, ...rest } = props;

  return (
    <label>
      <input
        className={clsx(
          "h-9 w-full appearance-none rounded bg-contrast-higher py-1 px-3 text-contrast-lower",
          className,
        )}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={onChange}
        {...rest}
      />
    </label>
  );
};
