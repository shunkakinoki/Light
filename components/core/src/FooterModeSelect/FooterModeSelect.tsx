import { useTheme } from "next-themes";
import type { FC } from "react";

export const FooterModeSelect: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <select
        id="mode"
        name="mode"
        className="mt-1 w-full cursor-pointer rounded-md border-contrast-low bg-inherit py-2 pr-10 pl-3 text-base text-contrast-medium focus:border-primary-light focus:outline-none focus:ring-primary-lighter sm:block sm:text-sm"
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
