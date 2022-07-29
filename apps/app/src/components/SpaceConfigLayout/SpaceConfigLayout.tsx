import type { FC } from "react";
import { useState, useEffect } from "react";

import { SpaceConfigInput } from "@lightdotso/app/components/SpaceConfigInput";
import { SpaceConfigSelect } from "@lightdotso/app/components/SpaceConfigSelect";

import { useSpaceConfigLayout } from "@lightdotso/app/hooks/useSpaceConfigLayout";
import type {
  ISpaceLayout,
  ISpaceLayoutProperty,
} from "@lightdotso/app/types/space";

export interface Props {
  layout: ISpaceLayout;
}

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export const SpaceConfigLayout: FC<Props> = ({ layout }) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      {layout.properties.map(p => {
        return <LayoutProperty key={p.name} property={p} />;
      })}
    </div>
  );
};

export const LayoutProperty: FC<{
  property: ISpaceLayoutProperty;
}> = ({ property: p }) => {
  const [layoutConfig, setLayoutConfig] = useSpaceConfigLayout();

  return (
    <div className="flex">
      <h1 className="mt-1 mr-4 w-32 text-contrast-high">{p.name}</h1>;
      <div className="w-full">
        {p.type === "text" ? (
          <SpaceConfigInput
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            onChange={(e): void => {
              return setLayoutConfig({ [p.name]: e.target.value });
            }}
          />
        ) : p.type === "number" ? (
          <SpaceConfigInput
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            type="number"
            onChange={(e): void => {
              return setLayoutConfig({ [p.name]: e.target.value });
            }}
          />
        ) : p.type === "select" ? (
          <SpaceConfigSelect
            options={p.options.map(value => {
              return { value };
            })}
            value={layoutConfig[p.name] ?? ""}
            onChange={(value): void => {
              return setLayoutConfig({ [p.name]: value });
            }}
          />
        ) : null}
        {p.description != null && (
          <span className="text-xs text-gray-400">{p.description}</span>
        )}
      </div>
    </div>
  );
};
