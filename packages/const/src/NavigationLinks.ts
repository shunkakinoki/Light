import { NotionLinks } from "./NotionLinks";
import { SocialLinks } from "./SocialLinks";

export const NavigationLinks = {
  resources: [
    { name: "Changelog", href: "/changelog", external: false },
    { name: "Docs", href: "/docs", external: false },
    { name: "FAQ", href: "/faq", external: false },
    { name: "Membership", href: "/member", external: false },
    { name: "Support", href: SocialLinks.Discord, external: true },
  ],
  company: [
    { name: "Careers", href: NotionLinks.Careers, external: true },
    { name: "Home", href: "/home", external: false },
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
