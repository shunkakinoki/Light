// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

abstract contract LightProxy is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable
{}
