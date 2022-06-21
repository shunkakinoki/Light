export enum Social {
  DISCORD = "Discord",
  OPENSEA = "Opensea",
  GITHUB = "Github",
  MIRROR = "Mirror",
  NOTION = "Notion",
  TWITTER = "Twitter",
}

export const SocialLinks: {
  readonly [key in Social]: string;
} = {
  [Social.DISCORD]: "https://discord.gg/Vgfxg2Rcy8",
  [Social.GITHUB]: "https://github.com/LightDotSo",
  [Social.MIRROR]: "https://mirror.xyz/lightdotso.eth",
  [Social.NOTION]: "https://lightdotso.notion.site",
  [Social.OPENSEA]: "https://opensea.io",
  [Social.TWITTER]: "https://twitter.com/LightDotSo",
};
