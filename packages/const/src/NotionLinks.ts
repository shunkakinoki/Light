export enum NotionPages {
  CAREERS = "Careers",
  COMMUNITY = "Community",
  PRIVACY_POLICY = "Privacy Policy",
  TERMS_OF_SERVICE = "Terms of Service",
  MARKETING = "Marketing",
  ROADMAP = "Roadmap",
  TEAM = "Team",
}

export const NotionLinks: {
  readonly [key in NotionPages]: string;
} = {
  [NotionPages.CAREERS]:
    "https://lightdotso.notion.site/3241632ef8d54d21a73732cbad792ce4",
  [NotionPages.COMMUNITY]:
    "https://lightdotso.notion.site/a797b4dd6772427f9039530f8237af52",
  [NotionPages.PRIVACY_POLICY]:
    "https://lightdotso.notion.site/81dbf21d7bca4b9285a13392edbf575e",
  [NotionPages.TERMS_OF_SERVICE]:
    "https://lightdotso.notion.site/38d646143772410887a0e6cae3ee0e56",
  [NotionPages.MARKETING]:
    "https://lightdotso.notion.site/7376e95f478740609a7892a6655b9654",
  [NotionPages.ROADMAP]:
    "https://lightdotso.notion.site/21b4c7b11a6747dd88a89eb7a1177837",
  [NotionPages.TEAM]:
    "https://lightdotso.notion.site/a01c7d1d1eb94ce697595e53d6e8568b",
};
