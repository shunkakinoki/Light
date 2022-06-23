import type { FC } from "react";

export const SettingsUsername: FC = () => {
  return (
    <div className="rounded-md border border-contrast-lower cursor-not-allowed">
      <div className="flex flex-col py-6 px-8 space-y-4">
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
        <div className="flex mt-20 rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 sm:text-sm text-contrast-medium rounded-l-md border border-r-0 border-contrast-medium">
            light.so/
          </span>
          <input
            disabled
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            className="block grow w-full min-w-0 sm:text-sm text-contrast-high bg-inherit rounded-none rounded-r-md border-contrast-medium focus:border-primary-light focus:ring-primary-light"
            defaultValue="shunkakinoki"
          />
        </div>
      </div>
      <div className="flex items-center py-4 px-8 bg-contrast-lower">
        <p className="grow text-contrast-medium">
          Please use 48 charactors at maximum.
        </p>
        <button
          disabled
          type="submit"
          className="inline-flex flex-none justify-center py-2 px-4 text-sm font-medium text-bg bg-contrast-higher hover:bg-contrast-high rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-contrast-high focus:ring-offset-2 shadow-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};
