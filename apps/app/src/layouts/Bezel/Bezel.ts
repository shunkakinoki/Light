import type { ISpaceLayout } from "@lightdotso/app/types/space";

export const Bezel: ISpaceLayout = {
  name: "Bezel",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
    },
    {
      name: "Name",
      type: "text",
      default: "lightdotso.eth",
      placeholder: "kaki.eth",
    },
  ],
};
