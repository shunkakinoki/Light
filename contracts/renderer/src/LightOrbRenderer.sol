// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "base64-sol/base64.sol";
import "./LightOrbMetadata.sol";
import { IRenderer } from "@lightdotso/renderer/IRenderer.sol";

/// @title Light SVG Renderer
/// @author Code by Shun Kakinoki <shunkakinoki@gmail.com>
/// @author Design by Oz Hashimoto <hello@okazu.co>
/// @dev Heavily inspired by WatchFacesWorld (https://www.watchfaces.world/)
/// @dev Referenced code in the section.
contract LightOrbRenderer is IRenderer {
  error InvalidTokenId();

  struct LightOrbConfiguration {
    uint8 bezelId;
    uint8 orbId;
    uint8 sparkleId;
    uint8 spiralId;
  }

  /// Credits
  string constant AUTHOR = "Oz Hashimoto";
  string constant DESIGN = "Zypsy DAO";
  string constant PRODUCT = "Light";

  /// Constants for bit masks
  uint256 constant BEZEL_PART_BASE = 1_000_000;
  uint256 constant ORB_PART_BASE = 10_000;
  uint256 constant SPARKLE_PART_BASE = 100;
  uint256 constant SPIRAL_PART_BASE = 1;

  function render(
    uint256 _tokenId,
    address _owner,
    uint256 _timestamp,
    string calldata _name
  ) public pure returns (string memory) {
    LightOrbConfiguration memory configuration = parseTokenId(_tokenId);
    string memory raw = renderSVG(configuration, _owner, _timestamp);

    return
      string.concat(
        "data:application/json;base64,",
        Base64.encode(
          bytes(
            LightOrbMetadata.getMetadataJSON(
              configuration.bezelId,
              configuration.orbId,
              configuration.sparkleId,
              configuration.spiralId,
              _name,
              Base64.encode(bytes(raw))
            )
          )
        )
      );
  }

  function renderRaw(
    uint256 _tokenId,
    address _owner,
    uint256 _timestamp
  ) public pure returns (string memory) {
    LightOrbConfiguration memory configuration = parseTokenId(_tokenId);
    string memory raw = renderSVG(configuration, _owner, _timestamp);

    return raw;
  }

  function parseTokenId(uint256 _tokenId)
    internal
    pure
    returns (LightOrbConfiguration memory configuration)
  {
    if (_tokenId / 100000000 == 0) revert InvalidTokenId();

    configuration.bezelId = uint8((_tokenId / BEZEL_PART_BASE) % 100);
    configuration.orbId = uint8((_tokenId / ORB_PART_BASE) % 100);
    configuration.sparkleId = uint8((_tokenId / SPARKLE_PART_BASE) % 100);
    configuration.spiralId = uint8((_tokenId / SPIRAL_PART_BASE) % 100);
  }

  function generateCssVars(uint256 _bezelId)
    internal
    pure
    returns (string memory)
  {
    LightOrbData.Bezel memory bezel = LightOrbData.getBezel(_bezelId);

    return string.concat("<style>", bezel.name, "</style>");
  }

  function renderSVG(
    LightOrbConfiguration memory _config,
    address _owner,
    uint256 _timestamp
  ) public pure returns (string memory) {
    return
      string.concat(
        '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" style="background:#000">',
        string.concat(
          Utils.uint2str(uint256(uint160(_owner))),
          Utils.uint2str(uint256(uint160(_timestamp)))
        ),
        generateCssVars(_config.bezelId),
        "</svg>"
      );
  }
}
