/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightToken } from "@lightdotso/token/ILightToken.sol";

/// @title Library for token related utils.
/// @notice This contract is based from Graph Protocol's TokenUtils (GPL-2.0-or-later)
/// @notice Ref: https://github.com/graphprotocol/contracts/blob/dev/contracts/utils/TokenUtils.sol
library TokenUtils {
  /**
   * @dev Pull tokens from an address to this contract.
   * @param _lightToken Token to transfer
   * @param _from Address sending the tokens
   * @param _amount Amount of tokens to transfer
   */
  function pullTokens(
    ILightToken _lightToken,
    address _from,
    uint256 _amount
  ) internal {
    if (_amount > 0) {
      require(
        _lightToken.transferFrom(_from, address(this), _amount),
        "!transfer"
      );
    }
  }

  /**
   * @dev Push tokens from this contract to a receiving address.
   * @param _lightToken Token to transfer
   * @param _to Address receiving the tokens
   * @param _amount Amount of tokens to transfer
   */
  function pushTokens(
    ILightToken _lightToken,
    address _to,
    uint256 _amount
  ) internal {
    if (_amount > 0) {
      require(_lightToken.transfer(_to, _amount), "!transfer");
    }
  }

  /**
   * @dev Burn tokens held by this contract.
   * @param _lightToken Token to burn
   * @param _amount Amount of tokens to burn
   */
  function burnTokens(ILightToken _lightToken, uint256 _amount) internal {
    if (_amount > 0) {
      _lightToken.burn(_amount);
    }
  }
}
