// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightOperatorStore } from "@lightdotso/protocol/interfaces/ILightOperatorStore.sol";

interface ILightOperatable {
  error NotAuthorized();

  event SetOperator(address operator);

  function lightOperatorStore() external view returns (ILightOperatorStore);
}
