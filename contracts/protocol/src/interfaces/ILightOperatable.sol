// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightOperator } from "@lightdotso/protocol/interfaces/ILightOperator.sol";

interface ILightOperatable {
  error NotAuthorized();

  event SetOperator(address operator);

  function lightOperator() external view returns (ILightOperator);
}
