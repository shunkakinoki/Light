import { Error } from "@lightdotso/app/components/Error";

export const NotFound = () => {
  return <Error statusCode={404} />;
};
