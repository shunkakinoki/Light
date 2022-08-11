// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

/// @title Library for storing light orbs metadata
/// @author Shun Kakinoki <shunkakinoki@gmail.com>
/// @dev Code heavily taken from WatchFacesWorld's (https://www.watchfaces.world/) Metadata library.
/// @dev Referenced code in the section.
library LightOrbMetadata {
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
