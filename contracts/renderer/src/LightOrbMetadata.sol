// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "./LightOrbData.sol";

/// @title Library for storing light orbs metadata
/// @author Shun Kakinoki <shunkakinoki@gmail.com>
/// @dev Code heavily taken from WatchFacesWorld's (https://www.watchfaces.world/) Metadata library.
/// @dev Referenced code in the section.
library LightOrbMetadata {
  function getMetadataJSON(
    uint8 _bezelId,
    uint8 _orbId,
    uint8 _sparkleId,
    uint8 _spiralId,
    string calldata _name,
    string memory _svgData
  ) public pure returns (string memory) {
    string memory attributes = renderAttributes(
      _bezelId,
      _orbId,
      _sparkleId,
      _spiralId
    );
    return
      string.concat(
        '{"name": "',
        renderName(_bezelId, _orbId, _sparkleId, _spiralId, _name),
        '", "background_color": "000000", "image": "data:image/svg+xml;base64,',
        _svgData,
        '","attributes":[',
        attributes,
        "]}"
      );
  }

  function renderName(
    uint8 _bezelId,
    uint8 _orbId,
    uint8 _sparkleId,
    uint8 _spiralId,
    string calldata _name
  ) public pure returns (string memory) {
    string memory prefix = "";
    if (bytes(_name).length > 0) {
      prefix = string.concat(_name, " ");
    }
    return
      string.concat(
        "Light Orb ",
        prefix,
        Utils.uint2str(_bezelId),
        "-",
        Utils.uint2str(_orbId),
        "-",
        Utils.uint2str(_sparkleId),
        "-",
        Utils.uint2str(_spiralId)
      );
  }

  function renderAttributes(
    uint8 _bezelId,
    uint8 _orbId,
    uint8 _sparkleId,
    uint8 _spiralId
  ) public pure returns (string memory) {
    return
      string.concat(
        attributeString("Bezel", LightOrbData.getBezel(_bezelId).name),
        ",",
        attributeString("Orb", LightOrbData.getOrb(_orbId).name),
        ",",
        attributeString("Sparkle", LightOrbData.getSparkle(_sparkleId).name),
        ",",
        attributeString("Spiral", LightOrbData.getSpiral(_spiralId).name)
      );
  }

  function attributeString(string memory _name, string memory _value)
    public
    pure
    returns (string memory)
  {
    return
      string.concat(
        "{",
        kv("trait_type", string.concat('"', _name, '"')),
        ",",
        kv("value", string.concat('"', _value, '"')),
        "}"
      );
  }

  function attributeBool(string memory _name, bool _value)
    public
    pure
    returns (string memory)
  {
    return attributeString(_name, _value ? "Yes" : "No");
  }

  function kv(string memory _key, string memory _value)
    public
    pure
    returns (string memory)
  {
    return string.concat('"', _key, '"', ":", _value);
  }
}
