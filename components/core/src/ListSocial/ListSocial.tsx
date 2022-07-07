import { Social, SocialLinks } from "@lightdotso/const";

import type { FC } from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

const navigation = {
  social: [
    {
      name: Social.TWITTER,
      href: SocialLinks.Twitter,
      icon: props => {
        return <FaTwitter className="text-contrast-medium" {...props} />;
      },
    },
    {
      name: Social.GITHUB,
      href: SocialLinks.Github,
      icon: props => {
        return <FaGithub className="text-contrast-medium" {...props} />;
      },
    },
    {
      name: Social.DISCORD,
      href: SocialLinks.Discord,
      icon: props => {
        return <FaDiscord className="text-contrast-medium" {...props} />;
      },
    },
  ],
};

export const ListSocial: FC = () => {
  return (
    <div className="flex space-x-6">
      {navigation.social.map(item => {
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="text-contrast-medium hover:text-contrast-high"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
};
