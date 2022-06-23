import { useTheme } from "next-themes";
import type { FC } from "react";

export const FooterModeSelect: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <select
        id="mode"
        name="mode"
        className="sm:block py-2 pr-10 pl-3 mt-1 w-full text-base sm:text-sm text-contrast-medium bg-inherit rounded-md border-contrast-low focus:border-primary-light focus:outline-none focus:ring-primary-lighter cursor-pointer"
        value={theme}
        onBlur={() => {}}
        onChange={e => {
          return setTheme(e.target.value);
        }}
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};
