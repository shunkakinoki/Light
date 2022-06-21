import type { FC } from "react";

import { Config } from "@lightdotso/og/components/Config";
import { Viewer } from "@lightdotso/og/components/Viewer";

export const Index: FC = () => {
  return (
    <main className="mx-auto my-12 flex h-screen w-full max-w-6xl flex-col items-center justify-center lg:my-8">
      <header className="mt-20 mb-16 space-y-6 text-center">
        <h1 className="text-5xl font-bold text-contrast-higher">
          OG Generator for Light
        </h1>
      </header>
      <section className="grid grid-cols-1 gap-y-8 px-4 md:grid-cols-3 md:gap-8">
        <Config />
        <Viewer />
      </section>
    </main>
  );
};

export default Index;
