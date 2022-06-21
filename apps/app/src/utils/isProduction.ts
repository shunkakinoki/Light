import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const isProduction = publicRuntimeConfig.env === "production";
