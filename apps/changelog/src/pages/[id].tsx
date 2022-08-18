import { Footer } from "@lightdotso/core";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import dynamic from "next/dynamic";

import { Header } from "@lightdotso/changelog/components/Header";
import { NOTION_CHANGELOG_ID } from "@lightdotso/changelog/config/Notion";
import {
  getPage,
  getBlocks,
  getPropertyValue,
  queryDatabase,
} from "@lightdotso/changelog/libs/services/notion";

const Notion = dynamic(
  async () => {
    const mod = await import("@lightdotso/changelog/components/Notion");
    return mod.Notion;
  },
  {
    ssr: false,
  },
);

export type Props = {
  page: string;
  blocks: string;
  number: string;
  title: string;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { id },
}: GetStaticPropsContext) => {
  const parsedId = parseStringArray(id);

  const result = await queryDatabase(NOTION_CHANGELOG_ID, {
    property: "Number",
    number: {
      equals: parseInt(parsedId),
    },
  });

  if (!result[0].id) {
    return {
      notFound: true,
    };
  }

  const page = await getPage(result[0].id);
  const pageId = page.id;
  const blocks = await getBlocks(result[0].id);

  //@ts-expect-error
  const numberPropertyId = page.properties["Number"].id;
  const numberPropertyItem = await getPropertyValue({
    pageId,
    propertyId: numberPropertyId,
  });
  //@ts-expect-error
  const number = numberPropertyItem.number;

  //@ts-expect-error
  const titlePropertyId = page.properties["Name"].id;
  const titlePropertyItem = await getPropertyValue({
    pageId,
    propertyId: titlePropertyId,
  });
  const title = titlePropertyItem
    //@ts-expect-error
    .map(propertyItem => {
      return propertyItem.title.plain_text;
    })
    .join("");

  const childBlocks = await Promise.all(
    blocks
      .filter(block => {
        return block.has_children;
      })
      .map(async block => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      }),
  );
  const blocksWithChildren = blocks.map(block => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(x => {
        return x.id === block.id;
      })?.children;
    }
    return block;
  });

  return {
    props: {
      page: JSON.stringify(page),
      blocks: JSON.stringify(blocksWithChildren),
      number: JSON.stringify(number),
      title: JSON.stringify(title),
    },
  };
};

export const IdPage = ({
  page,
  blocks,
  number,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <Header />
      <Notion
        blocks={JSON.parse(blocks)}
        page={JSON.parse(page)}
        number={JSON.parse(number)}
        title={JSON.parse(title)}
      />
      <Footer />
    </>
  );
};

export default IdPage;
