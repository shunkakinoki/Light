import type { ISpaceLayout } from "@lightdotso/app/types/space";

export const Bezel: ISpaceLayout = {
  name: "Bezel",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
    },
  ],
};
