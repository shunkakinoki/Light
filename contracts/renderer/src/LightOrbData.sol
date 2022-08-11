// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

/// @title Library for storing light orbs data
/// @author Shun Kakinoki <shunkakinoki@gmail.com>
/// @author Design by Oz Hashimoto <hello@okazu.co>
library LightOrbData {
  /// 16 types
  enum BazelId {
    Special,
    Gold,
    Silver,
    MetalGray,
    MetalBlack,
    White,
    Pink,
    Purple,
    Turqoise,
    Blue,
    SkyBlue,
    Teal,
    Green,
    Yellow,
    Orange,
    Red
  }

  /// 16 types
  enum OrbId {
    Pink,
    Purple,
    Blue,
    SkyBlue,
    Teal,
    Green,
    Yellow,
    Orange,
    Red,
    Gray,
    DeepPurple,
    Gold,
    EverGreen,
    Emerald,
    Sapphire,
    Diamond
  }

  struct Bazel {
    BazelId id;
    string name;
  }

  struct Orb {
    OrbId id;
    string name;
  }
}
