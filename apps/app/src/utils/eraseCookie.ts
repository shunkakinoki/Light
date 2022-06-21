export const eraseCookie = name => {
  document.cookie = name + "=; Max-Age=0";
};
