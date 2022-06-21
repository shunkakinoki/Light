import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const isPreview = publicRuntimeConfig.env === "preview";
