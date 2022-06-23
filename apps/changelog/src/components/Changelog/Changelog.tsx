import { SocialLinks } from "@lightdotso/const";
import Link from "next/link";

import { NotionImage } from "@lightdotso/changelog/components/NotionImage";
import { leftNumberPad } from "@lightdotso/changelog/utils/leftNumberPad";

export const Changelog = ({ posts }) => {
  if (!posts) {
    return <div />;
  }

  return (
    <div className="px-3 mx-auto max-w-2xl">
      <div className="mt-16">
        <h3 className="text-5xl font-extrabold text-contrast-higher">
          Changelog
        </h3>
        <p className="mt-8 text-contrast-medium">
          Follow along with updates and changes made to Light.
        </p>
        <div className="mt-3">
          <a
            href={SocialLinks.Twitter}
            className="font-extrabold text-contrast-high hover:text-contrast-medium underline"
            target="_blank"
            rel="noreferrer"
          >
            Follow us on Twitter
          </a>
        </div>
      </div>
      <div className="flex flex-col my-12 space-y-8">
        {posts.map(post => {
          const date = new Date(post.last_edited_time).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          return (
            <Link
              key={post.id}
              passHref
              href={`/${leftNumberPad(post.properties.Number.number)}`}
            >
              <a className="group">
                <div className="aspect-w-16 aspect-h-9">
                  <NotionImage src={post.cover.external.url} alt={post.id} />
                </div>
                <div className="justify-between items-start mt-6 w-full">
                  <div className="flex justify-between w-full">
                    <h3 className="text-base sm:text-lg font-bold text-contrast-medium group-hover:text-contrast-low">
                      Changelog #{leftNumberPad(post.properties.Number.number)}
                    </h3>
                    <h3 className="text-base sm:text-lg text-contrast-medium group-hover:text-contrast-low">
                      {date}
                    </h3>
                  </div>
                  <h3 className="mt-3 text-xl sm:text-3xl font-bold text-contrast-higher group-hover:text-contrast-high">
                    {post.properties.Name.title[0].text.content}
                  </h3>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
