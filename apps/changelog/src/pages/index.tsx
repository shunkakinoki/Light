import { Footer } from "@lightdotso/core";

import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { Changelog } from "@lightdotso/changelog/components/Changelog";
import { Header } from "@lightdotso/changelog/components/Header";
import { NOTION_CHANGELOG_ID } from "@lightdotso/changelog/config/Notion";
import {
  getDatabase,
  getPropertyValue,
} from "@lightdotso/changelog/libs/services/notion";

export type Props = {
  posts: any;
  tasks: any;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const database = await getDatabase(NOTION_CHANGELOG_ID);

  const posts = database.filter(post => {
    //@ts-expect-error
    return post.cover !== null && post.cover.external_url !== null;
  });

  const tasks = [];
  for (const page of posts) {
    const pageId = page.id;

    //@ts-expect-error
    const datePropertyId = page.properties["Date"].id;
    const datePropertyItem = await getPropertyValue({
      pageId,
      propertyId: datePropertyId,
    });
    //@ts-expect-error
    const date = datePropertyItem.date.start;

    //@ts-expect-error
    const namePropertyId = page.properties["Name"].id;
    const namePropertyItems = await getPropertyValue({
      pageId,
      propertyId: namePropertyId,
    });
    const name = namePropertyItems
      //@ts-expect-error
      .map(propertyItem => {
        return propertyItem.title.plain_text;
      })
      .join("");

    //@ts-expect-error
    const numberPropertyId = page.properties["Number"].id;
    const numberPropertyItem = await getPropertyValue({
      pageId,
      propertyId: numberPropertyId,
    });
    //@ts-expect-error
    const number = numberPropertyItem.number;

    tasks.push({ date: date, name: name, number: number });
  }

  return {
    props: {
      posts: posts,
      tasks: JSON.stringify(tasks),
    },
  };
};

export const SlugPage = ({
  posts,
  tasks,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <Header />
      <Changelog posts={posts} tasks={JSON.parse(tasks)} />
      <Footer />
    </>
  );
};

export default SlugPage;
