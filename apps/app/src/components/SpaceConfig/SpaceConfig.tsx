import { useMemo } from "react";

import type { FC } from "react";

import { SpaceConfigLayout } from "@lightdotso/app/components/SpaceConfigLayout";
import { SpaceConfigSelect } from "@lightdotso/app/components/SpaceConfigSelect";

import { useSpaceConfig } from "@lightdotso/app/hooks/useSpaceConfig";
import { layouts } from "@lightdotso/app/layouts";

export const SpaceConfig: FC = () => {
  const [{ layoutName }, setConfig] = useSpaceConfig();

  const layout = useMemo(() => {
    return layouts.find(l => {
      return l.name === layoutName;
    });
  }, [layoutName]);

  return (
    <div className="my-auto mt-12 h-full items-center justify-center space-y-4">
      <div className="flex">
        <h1 className="mt-1 mr-4 w-32 text-contrast-high">Layout</h1>
        <SpaceConfigSelect
          value={layoutName}
          options={layouts.map(l => {
            return { value: l.name };
          })}
          onChange={(layoutName): void => {
            return setConfig(c => {
              return { ...c, layoutName };
            });
          }}
        />
      </div>
      <hr />
      {layout == null ? (
        <p>Layout {layoutName} does not exist</p>
      ) : (
        <SpaceConfigLayout key={layout.name} layout={layout} />
      )}
    </div>
  );
};
