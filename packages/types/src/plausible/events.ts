export type PlausibleEvents = {
  ConnectWallet: { id: string };
  FollowButton: { type: "OpenModalWallet" | "Follow" | "Unfollow" };
  LandingPage: { location: "CTA" | "Hero" };
};
