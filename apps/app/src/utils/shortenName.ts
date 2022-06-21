export const shortenName = (name: string) => {
  return name.match(/\b\w/g)?.join("").substring(0, 3);
};
