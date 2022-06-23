import { ApiLinks } from "@lightdotso/const";

import { isProduction } from "@lightdotso/app/utils/isProduction";

// export const LIGHT_API_URL = isProduction ? ApiLinks.API : ApiLinks.API_STAGING;
// TODO: change to production url
export const LIGHT_API_URL = isProduction
  ? ApiLinks.API
  : "https://api-9l9th9xue-lightdotso.vercel.app";
