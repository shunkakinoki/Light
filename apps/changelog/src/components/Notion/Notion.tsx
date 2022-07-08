/* eslint-disable no-case-declarations */

import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

import styles from "./Notion.module.css";

import { NotionImage } from "@lightdotso/changelog/components/NotionImage";
import { leftNumberPad } from "@lightdotso/changelog/utils/leftNumberPad";

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }

  return text.map(value => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={text.id}
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
          text.link ? styles.link : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} target="_blank" rel="noopener noreferrer">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

const renderBlock = block => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.rich_text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map(block => {
            return <Fragment key={block.id}>{renderBlock(block)}</Fragment>;
          })}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          {/* eslint-disable @next/next/no-img-element */}
          <NotionImage src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return (
        <pre className={styles.pre}>
          <code key={id} className={styles.code_block}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link passHref href={src_file}>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export const Notion = ({ page, blocks, title, number }) => {
  if (!page || !blocks) {
    return <div />;
  }

  const date = new Date(page.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:image" content={page.cover.external.url} />
        <meta property="og:image" content={page.cover.external.url} />
      </Head>
      <NextSeo
        title={title}
        description={`Changelog #${leftNumberPad(number)}`}
        openGraph={{
          images: [{ url: page.cover.external.url }],
        }}
      />
      <div className="mx-auto max-w-2xl py-16 px-3">
        <Link href="/">
          <a className="text-contrast-medium hover:underline">
            ← Go back to changelog
          </a>
        </Link>
        <h1 className="my-5 text-4xl font-extrabold text-contrast-higher">
          {title}
        </h1>
        <div className="mt-3 flex w-full justify-between">
          <h3 className="text-lg font-bold text-contrast-medium">
            Changelog #{leftNumberPad(number)}
          </h3>
          <h3 className="text-lg text-contrast-medium">{date}</h3>
        </div>
        <article className={styles.container}>
          {blocks.map(block => {
            return <Fragment key={block.id}>{renderBlock(block)}</Fragment>;
          })}
        </article>
      </div>
    </>
  );
};
