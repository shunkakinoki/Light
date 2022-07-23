import { InternalLinks } from "./InternalLinks";
import { NotionLinks } from "./NotionLinks";
import { SocialLinks } from "./SocialLinks";

export const NavigationLinks = {
  resources: [
    { name: "Changelog", href: InternalLinks.Changelog, external: false },
    { name: "Docs", href: InternalLinks.Docs, external: false },
    { name: "FAQ", href: NotionLinks.Faq, external: true },
    { name: "Membership", href: InternalLinks.Membership, external: false },
    { name: "Support", href: SocialLinks.Discord, external: true },
  ],
  company: [
    { name: "Careers", href: NotionLinks.Careers, external: true },
    { name: "Home", href: InternalLinks.Home, external: false },
    { name: "Open", href: SocialLinks.Plausible, external: false },
    { name: "Notion", href: SocialLinks.Notion, external: true },
  ],
  legal: [
    {
      name: "Privacy Policy",
      href: NotionLinks["Privacy Policy"],
      external: true,
    },
    {
      name: "Terms of Service",
      href: NotionLinks["Terms of Service"],
      external: true,
    },
  ],
};
