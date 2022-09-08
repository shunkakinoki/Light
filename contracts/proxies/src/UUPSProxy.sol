/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { ERC1967UpgradeUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol";

contract UUPSProxy is ERC1967UpgradeUpgradeable {
  constructor(address _implementation, bytes memory _data) {
    __ERC1967Upgrade_init_unchained();
  }
}
