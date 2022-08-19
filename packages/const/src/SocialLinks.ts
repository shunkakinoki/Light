export enum Social {
  DISCORD = "Discord",
  GITHUB = "Github",
  MIRROR = "Mirror",
  NOTION = "Notion",
  PLAUSIBLE = "Plausible",
  TWITTER = "Twitter",
  WEBSITE = "Website",
}

export const SocialLinks: {
  readonly [key in Social]: string;
} = {
  [Social.DISCORD]: "https://discord.gg/Vgfxg2Rcy8",
  [Social.GITHUB]: "https://github.com/LightDotSo",
  [Social.MIRROR]: "https://mirror.xyz/lightdotso.eth",
  [Social.NOTION]: "https://lightdotso.notion.site",
  [Social.PLAUSIBLE]: "https://plausible.io/light.so",
  [Social.TWITTER]: "https://twitter.com/LightDotSo",
  [Social.WEBSITE]: "https://light.so",
};
