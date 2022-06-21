import type { FC } from "react";

export const SettingsUsername: FC = () => {
  return (
    <div className="cursor-not-allowed rounded-md border border-contrast-lower">
      <div className="flex flex-col space-y-4 py-6 px-8">
        <label
          htmlFor="username"
          className="block text-xl font-extrabold text-contrast-high"
        >
          Your Username{" "}
          <span className="text-base font-normal text-contrast-medium">
            (coming soon...)
          </span>
        </label>
        <p className="text-contrast-medium">
          This is your URL namespace within Light
        </p>
        <div className="mt-20 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-contrast-medium px-3 text-contrast-medium sm:text-sm">
            light.so/
          </span>
          <input
            disabled
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            className="block w-full min-w-0 grow rounded-none rounded-r-md border-contrast-medium bg-inherit text-contrast-high focus:border-primary-light focus:ring-primary-light sm:text-sm"
            defaultValue="shunkakinoki"
          />
        </div>
      </div>
      <div className="flex items-center bg-contrast-lower py-4 px-8">
        <p className="grow text-contrast-medium">
          Please use 48 charactors at maximum.
        </p>
        <button
          disabled
          type="submit"
          className="inline-flex flex-none justify-center rounded-md border border-transparent bg-contrast-higher py-2 px-4 text-sm font-medium text-bg shadow-sm hover:bg-contrast-high focus:outline-none focus:ring-2 focus:ring-contrast-high focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};
