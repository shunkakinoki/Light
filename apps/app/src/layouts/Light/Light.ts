import type { ISpaceLayout } from "@lightdotso/app/types/space";

export const Light: ISpaceLayout = {
  name: "Light",
  properties: [
    {
      name: "Bezel",
      type: "select",
      options: ["1"],
    },
    {
      name: "Light",
      type: "select",
      options: ["1", "2", "3", "4"],
    },
    {
      name: "Spiral",
      type: "select",
      options: ["1", "2", "3", "4"],
    },
  ],
};
