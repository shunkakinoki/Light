/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { ERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";

contract LightCurationToken is LightUpgradeable, ERC20Upgradeable {
  ///////////////////
  /// UPGRADEABLE ///
  ///////////////////

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  /**
   * @dev Light Curation Token Contract initializer.
   */
  function initialize() external override initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();

    ERC20Upgradeable.__ERC20_init("Light Curation Share", "LCS");
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  /**
   * @dev Mint new tokens.
   * @param _to Address to send the newly minted tokens
   * @param _amount Amount of tokens to mint
   */
  function mint(address _to, uint256 _amount) public onlyOwner {
    _mint(_to, _amount);
  }

  /**
   * @dev Burn tokens from an address.
   * @param _account Address from where tokens will be burned
   * @param _amount Amount of tokens to burn
   */
  function burnFrom(address _account, uint256 _amount) public onlyOwner {
    _burn(_account, _amount);
  }
}
