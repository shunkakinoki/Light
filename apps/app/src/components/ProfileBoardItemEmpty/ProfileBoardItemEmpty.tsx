import type { FC } from "react";

export const ProfileBoardItemEmpty: FC = () => {
  return (
    <div className="aspect-1 flex justify-center items-center h-full text-center rounded-lg border border-contrast-lower cursor-not-allowed">
      <h1 className="text-xl font-semibold text-center text-contrast-medium">
        Empty
      </h1>
    </div>
  );
};
