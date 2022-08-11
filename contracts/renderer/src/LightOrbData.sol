// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

/// @title Library for storing light orbs data
/// @author Code by Shun Kakinoki <shunkakinoki@gmail.com>
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

  /// 4 types
  enum SparkleId {
    Normal,
    Special,
    Unique,
    Legendary
  }

  /// 6 types
  enum SpiralId {
    Tornado
  }

  struct Bazel {
    BazelId id;
    string name;
  }

  struct Orb {
    OrbId id;
    string name;
  }

  struct Sparkle {
    SparkleId id;
    string name;
  }

  struct Spiral {
    SpiralId id;
    string name;
  }

  function getBazel(uint256 _bazelId) public pure returns (Bazel memory) {
    Bazel[16] memory bazels = [
      Bazel(BazelId.Special, "Special"),
      Bazel(BazelId.Gold, "Gold"),
      Bazel(BazelId.Silver, "Silver"),
      Bazel(BazelId.MetalGray, "MetalGray"),
      Bazel(BazelId.MetalBlack, "MetalBlack"),
      Bazel(BazelId.White, "White"),
      Bazel(BazelId.Pink, "Pink"),
      Bazel(BazelId.Purple, "Purple"),
      Bazel(BazelId.Turqoise, "Turqoise"),
      Bazel(BazelId.Blue, "Blue"),
      Bazel(BazelId.SkyBlue, "SkyBlue"),
      Bazel(BazelId.Teal, "Teal"),
      Bazel(BazelId.Green, "Green"),
      Bazel(BazelId.Yellow, "Yellow"),
      Bazel(BazelId.Orange, "Orange"),
      Bazel(BazelId.Red, "Red")
    ];

    return bazels[_bazelId];
  }

  function getOrb(uint256 _orbId) public pure returns (Orb memory) {
    Orb[16] memory orbs = [
      Orb(OrbId.Pink, "Pink"),
      Orb(OrbId.Purple, "Purple"),
      Orb(OrbId.Blue, "Blue"),
      Orb(OrbId.SkyBlue, "SkyBlue"),
      Orb(OrbId.Teal, "Teal"),
      Orb(OrbId.Green, "Green"),
      Orb(OrbId.Yellow, "Yellow"),
      Orb(OrbId.Orange, "Orange"),
      Orb(OrbId.Red, "Red"),
      Orb(OrbId.Gray, "Gray"),
      Orb(OrbId.DeepPurple, "DeepPurple"),
      Orb(OrbId.Gold, "Gold"),
      Orb(OrbId.EverGreen, "EverGreen"),
      Orb(OrbId.Emerald, "Emerald"),
      Orb(OrbId.Sapphire, "Sapphire"),
      Orb(OrbId.Diamond, "Diamond")
    ];

    return orbs[_orbId];
  }

  function getSparkle(uint256 _sparkleId) public pure returns (Sparkle memory) {
    Sparkle[4] memory sparkles = [
      Sparkle(SparkleId.Normal, "Normal"),
      Sparkle(SparkleId.Special, "Special"),
      Sparkle(SparkleId.Unique, "Unique"),
      Sparkle(SparkleId.Legendary, "Legendary")
    ];

    return sparkles[_sparkleId];
  }
}
