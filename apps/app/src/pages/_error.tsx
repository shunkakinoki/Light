import { Footer } from "@lightdotso/core";
import * as Sentry from "@sentry/nextjs";
import type { NextPageContext, NextPage } from "next";
import type { ErrorProps as NextErrorProps } from "next/error";
import NextError from "next/error";

import type { ErrorProps } from "@lightdotso/app/components/Error";
import { Error } from "@lightdotso/app/components/Error";
import { Header } from "@lightdotso/app/components/Header";

type CrustomErrorProps = {
  hasGetInitialPropsRun: boolean;
} & ErrorProps &
  NextErrorProps;

const CustomError: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Header active="Explore" />
      <Error statusCode={statusCode} />
      <Footer />
    </>
  );
};

CustomError.getInitialProps = async ({ res, err }: NextPageContext) => {
  const errorInitialProps = (await NextError.getInitialProps({
    res,
    err,
  } as NextPageContext)) as CrustomErrorProps;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  await Sentry.flush(2000);

  return errorInitialProps;
};

export default CustomError;
