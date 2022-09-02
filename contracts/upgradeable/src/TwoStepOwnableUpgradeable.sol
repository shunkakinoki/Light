/// SPDX-License-Identifier: MIT
// Revision of OpenZeppelin Contracts
// Code from: https://github.com/jameswenzel/utility-contracts/blob/main/src/TwoStepOwnable.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract TwoStepOwnableUpgradeable is
  Initializable,
  ContextUpgradeable
{
  address private _owner;
  // NEW variable for potential owner.
  address private _potentialOwner;

  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  event PotentialOwnerUpdated(address newPotentialOwner);

  /**
   * @dev Initializes the contract setting the deployer as the initial owner.
   */
  function __TwoStepOwnable_init() internal onlyInitializing {
    __TwoStepOwnable_init_unchained();
  }

  function __TwoStepOwnable_init_unchained() internal onlyInitializing {
    _transferOwnership(_msgSender());
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    _checkOwner();
    _;
  }

  /**
   * @dev Returns the address of the current owner.
   */
  function owner() public view virtual returns (address) {
    return _owner;
  }

  /** MODIFIED---------------------------------------------
   * @dev NEW! MODIFIED FROM ORIGINAL. Returns the address of the current potential owner.
   */
  function potentialOwner() public view virtual returns (address) {
    return _potentialOwner;
  }

  /**
   * @dev Throws if the sender is not the owner.
   */
  function _checkOwner() internal view virtual {
    require(owner() == _msgSender(), "TwoStepOwnable: caller is not the owner");
  }

  /**
   * @dev Leaves the contract without owner. It will not be possible to call
   * `onlyOwner` functions anymore. Can only be called by the current owner.
   *
   * NOTE: Renouncing ownership will leave the contract without an owner,
   * thereby removing any functionality that is only available to the owner.
   */
  function renounceOwnership() public virtual onlyOwner {
    _transferOwnership(address(0));
  }

  /** MODIFIED---------------------------------------------
   * @dev NEW! MODIFIED FROM ORIGINAL.
   * Transfers potential ownership of the contract to a new account (`newPotentialOwner`).
   * Can only be called by the current owner. This is a new function.
   */
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

  /** MODIFIED---------------------------------------------
   * @dev NEW! Transfers ownership of the contract to a new account (`newPotentialOwner`)
   * Only succeeds if the caller is the potential owner.
   * Can only be called by the current owner. This is a new function.
   */
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

  /** MODIFIED---------------------------------------------
   * @dev Leaves the contract without a potential owner.
   *
   * NOTE: Cancelling tranferring ownership will leave the contract without a potential owner,
   */
  function cancelTransferOwnership() public virtual onlyOwner {
    delete _potentialOwner;
    emit PotentialOwnerUpdated(address(0));
  }

  /**
   * @dev Transfers ownership of the contract to a new account (`newOwner`).
   * Internal function without access restriction.
   */
  function _transferOwnership(address newOwner) internal virtual {
    address oldOwner = _owner;
    _owner = newOwner;
    emit OwnershipTransferred(oldOwner, newOwner);
  }

  /** MODIFIED---------------------------------------------
   * @dev NEW! MODIFIED TO FILL IN GAPS. 49->48
   * This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[48] private __gap;
}
