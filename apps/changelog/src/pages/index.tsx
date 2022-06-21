import { Footer } from "@lightdotso/core";

import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { Changelog } from "@lightdotso/changelog/components/Changelog";
import { Header } from "@lightdotso/changelog/components/Header";
import { NOTION_CHANGELOG_ID } from "@lightdotso/changelog/config/Notion";
import { getDatabase } from "@lightdotso/changelog/libs/services/notion";

export type Props = {
  posts: any;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const database = await getDatabase(NOTION_CHANGELOG_ID);

  const posts = database.filter(post => {
    //@ts-expect-error
    return post.cover !== null && post.cover.external_url !== null;
  });

  return {
    props: {
      posts: posts,
    },
  };
};

export const SlugPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <Header />
      <Changelog posts={posts} />
      <Footer />
    </>
  );
};

export default SlugPage;
