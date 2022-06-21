import type { CategoryType } from "@prisma/client";
import { atom } from "recoil";

export interface TimelineCategory {
  category: CategoryType | "ALL";
}

export const timelineCategoryAtom = atom<TimelineCategory>({
  key: "timelineCategory",
  default: {
    category: "ALL",
  },
});
