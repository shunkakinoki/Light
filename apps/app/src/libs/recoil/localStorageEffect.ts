import type { AtomEffect } from "recoil";
import { DefaultValue } from "recoil";

export const localStorageEffect = <T>(key: string): AtomEffect<T> => {
  return ({ setSelf, onSet }): void => {
    if (typeof window === "undefined") {
      return;
    }

    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
};
