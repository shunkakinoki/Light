import { useRouter } from "next/router";
import BaseNProgress from "nprogress";
import type { FC } from "react";
import { useEffect } from "react";

export const NProgress: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => {
      return BaseNProgress.start();
    };
    const handleRouteDone = () => {
      return BaseNProgress.done();
    };
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);
  return null;
};
