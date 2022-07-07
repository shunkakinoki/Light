import type { FC } from "react";

export const ProfileBoardItemEmpty: FC = () => {
  return (
    <div className="flex aspect-1 h-full cursor-not-allowed items-center justify-center rounded-lg border border-contrast-lower text-center">
      <h1 className="text-center text-xl font-semibold text-contrast-medium">
        Empty
      </h1>
    </div>
  );
};
