import type { ISpaceLayout } from "@lightdotso/app/types/space";

export const Light: ISpaceLayout = {
  name: "Light",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
    },
  ],
};
