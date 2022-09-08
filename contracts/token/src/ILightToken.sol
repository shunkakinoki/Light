/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface ILightToken is IERC20Upgradeable {
  event MinterAdded(address indexed account);
  event MinterRemoved(address indexed account);

  function burn(uint256 amount) external;

  function mint(address _to, uint256 _amount) external;

  function addMinter(address _account) external;

  function removeMinter(address _account) external;

  function renounceMinter() external;

  function permit(
    address _owner,
    address _spender,
    uint256 _value,
    uint256 _deadline,
    uint8 _v,
    bytes32 _r,
    bytes32 _s
  ) external;
}
