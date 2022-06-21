import { SWR_LOCAL_STORAGE_KEY } from "@lightdotso/app/config/LocalStorage";

export const localStorageProvider = () => {
  const map = new Map(
    JSON.parse(localStorage?.getItem(SWR_LOCAL_STORAGE_KEY) || "[]"),
  );

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem(SWR_LOCAL_STORAGE_KEY, appCache);
  });

  return map;
};
