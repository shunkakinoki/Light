import { Footer } from "@lightdotso/core";

import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

import { Header } from "@lightdotso/changelog/components/Header";
import { Notion } from "@lightdotso/changelog/components/Notion";
import { NOTION_CHANGELOG_ID } from "@lightdotso/changelog/config/Notion";
import {
  getPage,
  getBlocks,
  queryDatabase,
} from "@lightdotso/changelog/libs/services/notion";

export type Props = {
  page: any;
  blocks: any;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
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
  const blocks = await getBlocks(result[0].id);

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
      page: page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};

export const IdPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (!page || !blocks) {
    return <div />;
  }

  return (
    <>
      <Header />
      <Notion blocks={blocks} page={page} />
      <Footer />
    </>
  );
};

export default IdPage;
