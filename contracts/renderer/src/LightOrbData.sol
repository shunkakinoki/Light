// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

/// @title Library for storing light orbs data
/// @author Code by Shun Kakinoki <shunkakinoki@gmail.com>
/// @author Design by Oz Hashimoto <hello@okazu.co>
library LightOrbData {
  /// 16 types
  enum BezelId {
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
    Tornado,
    Rapid,
    Shuriken,
    Cross,
    Hex,
    Oct
  }

  struct Bezel {
    BezelId id;
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

  function getBezel(uint256 _bezelId) public pure returns (Bezel memory) {
    Bezel[16] memory bezels = [
      Bezel(BezelId.Special, "Special"),
      Bezel(BezelId.Gold, "Gold"),
      Bezel(BezelId.Silver, "Silver"),
      Bezel(BezelId.MetalGray, "MetalGray"),
      Bezel(BezelId.MetalBlack, "MetalBlack"),
      Bezel(BezelId.White, "White"),
      Bezel(BezelId.Pink, "Pink"),
      Bezel(BezelId.Purple, "Purple"),
      Bezel(BezelId.Turqoise, "Turqoise"),
      Bezel(BezelId.Blue, "Blue"),
      Bezel(BezelId.SkyBlue, "SkyBlue"),
      Bezel(BezelId.Teal, "Teal"),
      Bezel(BezelId.Green, "Green"),
      Bezel(BezelId.Yellow, "Yellow"),
      Bezel(BezelId.Orange, "Orange"),
      Bezel(BezelId.Red, "Red")
    ];

    return bezels[_bezelId];
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

  function getSpiral(uint256 _spiralId) public pure returns (Spiral memory) {
    Spiral[6] memory spirals = [
      Spiral(SpiralId.Tornado, "Tornado"),
      Spiral(SpiralId.Rapid, "Rapid"),
      Spiral(SpiralId.Shuriken, "Shuriken"),
      Spiral(SpiralId.Cross, "Cross"),
      Spiral(SpiralId.Hex, "Hex"),
      Spiral(SpiralId.Oct, "Oct")
    ];

    return spirals[_spiralId];
  }
}
