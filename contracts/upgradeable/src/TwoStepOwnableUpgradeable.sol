// SPDX-License-Identifier: MIT
// Revision of OpenZeppelin Contracts

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

abstract contract TwoStepOwnableUpgradeable is
  Initializable,
  ContextUpgradeable
{
  address private _owner;
  address private _potentialOwner;

  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  event PotentialOwnerUpdated(address newPotentialOwner);

  function __TwoStepOwnable_init() internal onlyInitializing {
    __TwoStepOwnable_init_unchained();
  }

  function __TwoStepOwnable_init_unchained() internal onlyInitializing {
    _transferOwnership(_msgSender());
  }

  modifier onlyOwner() {
    _checkOwner();
    _;
  }

  function owner() public view virtual returns (address) {
    return _owner;
  }

  function potentialOwner() public view virtual returns (address) {
    return _potentialOwner;
  }

  function _checkOwner() internal view virtual {
    require(owner() == _msgSender(), "TwoStepOwnable: caller is not the owner");
  }

  function renounceOwnership() public virtual onlyOwner {
    _transferOwnership(address(0));
  }

  function transferOwnership(address newPotentialOwner)
    public
    virtual
    onlyOwner
  {
    require(
      newPotentialOwner != address(0),
      "TwoStepOwnable: new owner is the zero address"
    );
    _potentialOwner = newPotentialOwner;
    emit PotentialOwnerUpdated(newPotentialOwner);
  }

  function acceptOwnership() public virtual {
    require(
      potentialOwner() == _msgSender(),
      "TwoStepOwnable: caller is not the potential owner"
    );
    address newPotentialOwner = _potentialOwner;
    delete _potentialOwner;
    emit PotentialOwnerUpdated(address(0));
    _transferOwnership(newPotentialOwner);
  }

  function cancelTransferOwnership() public virtual onlyOwner {
    delete _potentialOwner;
    emit PotentialOwnerUpdated(address(0));
  }

  function _transferOwnership(address newOwner) internal virtual {
    address oldOwner = _owner;
    _owner = newOwner;
    emit OwnershipTransferred(oldOwner, newOwner);
  }

  uint256[48] private __gap;
}
