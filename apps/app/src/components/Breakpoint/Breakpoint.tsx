import type { FC } from "react";

export const Breakpoint: FC = () => {
  return (
    <>
      <div className="flex fixed right-0 bottom-0 justify-center items-center p-3 m-6 w-8 h-8 text-xs text-white bg-gray-700 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-purple-500 rounded-full border border-white">
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
          al
        </div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
          md
        </div>
        <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
          lg
        </div>
        <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
          xl
        </div>
        <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
          2xl
        </div>
      </div>
    </>
  );
};
