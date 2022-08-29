// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { ILightOperator } from "@lightdotso/protocol/interfaces/ILightOperator.sol";

interface ILightOperatable {
  event SetOperator(address operator);
}
