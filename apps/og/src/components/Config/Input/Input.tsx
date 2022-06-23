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
          "py-1 px-3 w-full h-9 text-contrast-lower bg-contrast-higher rounded appearance-none",
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
