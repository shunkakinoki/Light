import { BookmarkAltIcon, RssIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { SocialLinks } from "@lightdotso/const";
import Link from "next/link";
import type { FC } from "react";

const links = [
  {
    title: "Blog",
    description: "Read our latest news and articles",
    icon: RssIcon,
    href: SocialLinks.Mirror,
  },
  {
    title: "Guide",
    description: "Learn how to explore Light",
    icon: BookmarkAltIcon,
    href: SocialLinks.Notion,
  },
  {
    title: "Support",
    description: "Get help from our team on Discord",
    icon: RssIcon,
    href: SocialLinks.Discord,
  },
];

export type ErrorProps = {
  statusCode: number | undefined;
};

export const Error: FC<ErrorProps> = ({ statusCode }) => {
  return (
    <main className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
      <div className="py-16 sm:py-24 md:py-36 mx-auto max-w-xl">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-primary-light uppercase">
            {statusCode} error
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-contrast-higher">
            {statusCode === 404
              ? "This page does not exist."
              : "Oh oh. Something went wrong."}
          </h1>
          <p className="mt-2 text-lg text-contrast-medium">
            {statusCode === 404
              ? "The page you are looking for could not be found."
              : "The page you are looking for resulted in an error."}
          </p>
        </div>
        <div className="mt-12">
          <h2 className="text-sm font-semibold tracking-wide text-contrast-medium uppercase">
            Popular pages
          </h2>
          <ul className="mt-4 border-y border-contrast-lower divide-y divide-contrast-lower">
            {links.map((link, linkIdx) => {
              return (
                <li
                  key={linkIdx}
                  className="flex relative items-start py-6 space-x-4 hover:bg-bg-lighter"
                >
                  <div className="shrink-0">
                    <span className="flex justify-center items-center w-12 h-12 rounded-lg">
                      <link.icon
                        className="w-6 h-6 text-primary-light"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-contrast-high">
                      <span className="rounded-sm">
                        <a
                          className="focus:outline-none"
                          target="_blank"
                          rel="noreferrer"
                          href={link.href}
                        >
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {link.title}
                        </a>
                      </span>
                    </h3>
                    <p className="text-base text-contrast-medium">
                      {link.description}
                    </p>
                  </div>
                  <div className="shrink-0 self-center">
                    <ChevronRightIcon
                      className="w-5 h-5 text-contrast-low"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <Link passHref href="/">
              <a className="text-base font-medium text-primary-light hover:text-primary-lighter">
                Or go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
