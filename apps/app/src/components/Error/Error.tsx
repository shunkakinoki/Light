import {
  DocumentTextIcon,
  BookmarkSquareIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { SocialLinks } from "@lightdotso/const";
import Link from "next/link";
import type { FC } from "react";

const links = [
  {
    title: "Blog",
    description: "Read our latest news and articles",
    icon: DocumentTextIcon,
    href: SocialLinks.Mirror,
  },
  {
    title: "Guide",
    description: "Learn how to explore Light",
    icon: BookmarkSquareIcon,
    href: SocialLinks.Notion,
  },
  {
    title: "Support",
    description: "Get help from our team on Discord",
    icon: ChatBubbleBottomCenterIcon,
    href: SocialLinks.Discord,
  },
];

export type ErrorProps = {
  statusCode: number | undefined;
};

export const Error: FC<ErrorProps> = ({ statusCode }) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl py-16 sm:py-24 md:py-36">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-light">
            {statusCode} error
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-contrast-higher sm:text-5xl">
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-contrast-medium">
            Popular pages
          </h2>
          <ul className="mt-4 divide-y divide-contrast-lower border-y border-contrast-lower">
            {links.map((link, linkIdx) => {
              return (
                <li
                  key={linkIdx}
                  className="relative flex items-start space-x-4 py-6 hover:bg-bg-lighter"
                >
                  <div className="shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg">
                      <link.icon
                        className="h-6 w-6 text-primary-light"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
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
                      className="h-5 w-5 text-contrast-low"
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
