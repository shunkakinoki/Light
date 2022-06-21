import NextScript from "next/script";
import type { FC } from "react";

export const ThemeScript: FC = () => {
  const themeKey = "theme";
  const themeScriptSrc = `!function(){try{var d=document.documentElement;var e=localStorage.getItem(${themeKey});if(e){d.setAttribute('data-theme',e.trim())}else{d.setAttribute('data-theme','light');}}catch(t){}}();`;

  const isServer = typeof window === "undefined";
  const encodeBase64 = (str: string) => {
    return isServer ? Buffer.from(str).toString("base64") : btoa(str);
  };
  const encodedScript = `data:text/javascript;base64,${encodeBase64(
    themeScriptSrc,
  )}`;

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <NextScript
      id="theme-script"
      src={encodedScript}
      strategy="beforeInteractive"
    />
  );
};
