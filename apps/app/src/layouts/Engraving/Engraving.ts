import type { ISpaceLayout } from "@lightdotso/app/types/space";

export const Engraving: ISpaceLayout = {
  name: "Engraving",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
    },
    {
      name: "Engraving",
      type: "text",
      default: "lightdotso.eth",
    },
  ],
};
