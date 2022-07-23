export enum Internal {
  CHANGELOG = "Changelog",
  DOCS = "Docs",
  HOME = "Home",
  MEMBER = "Membership",
}

export const InternalLinks: {
  readonly [key in Internal]: string;
} = {
  [Internal.CHANGELOG]: "/changelog",
  [Internal.DOCS]: "/docs",
  [Internal.HOME]: "/home",
  [Internal.MEMBER]: "/membership",
};
