/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { ILightToken } from "@lightdotso/token/ILightToken.sol";
import { LightTokenStorage } from "@lightdotso/token/LightTokenStorage.sol";

/// @title Light Token
/// @title Extends OZ as an ERC20 + EIP-2612 compatible implementation.
/// @author Shun Kakinoki
contract LightToken is
  ERC20Upgradeable,
  ERC20BurnableUpgradeable,
  OwnableUpgradeable,
  LightTokenStorage,
  ILightToken
{
  /**************
   * IMMUTABLES *
   **************/
  uint256 internal immutable INITIAL_CHAIN_ID;
  bytes32 internal immutable INITIAL_DOMAIN_SEPARATOR;

  constructor() ERC20Upgradeable() {
    INITIAL_CHAIN_ID = block.chainid;
    INITIAL_DOMAIN_SEPARATOR = computeDomainSeparator();
  }

  /*************
   * MODIFIERS *
   *************/
  modifier onlyMinter() {
    require(isMinter(msg.sender), "Only minter can call");
    _;
  }

  /*************
   * EXTERNALS *
   *************/
  function allowance(address owner, address spender)
    public
    view
    virtual
    override(ERC20Upgradeable, IERC20Upgradeable)
    returns (uint256)
  {
    return super.allowance(owner, spender);
  }

  function burn(uint256 amount)
    public
    override(ERC20BurnableUpgradeable, ILightToken)
  {
    super.burn(amount);
  }

  /**
   * @dev Add a new minter.
   * @param _account Address of the minter
   */
  function addMinter(address _account) external onlyOwner {
    _addMinter(_account);
  }

  /**
   * @dev Remove a minter.
   * @param _account Address of the minter
   */
  function removeMinter(address _account) external onlyOwner {
    _removeMinter(_account);
  }

  /**
   * @dev Renounce to be a minter.
   */
  function renounceMinter() external {
    _removeMinter(msg.sender);
  }

  /**
   * @dev Mint new tokens.
   * @param _to Address to send the newly minted tokens
   * @param _amount Amount of tokens to mint
   */
  function mint(address _to, uint256 _amount) external onlyMinter {
    _mint(_to, _amount);
  }

  /************
   * EIP-2612 *
   ************/

  /**
   * @dev Returns the domain separator based on the chainId it was initially deployed to.
   * @notice This method is based from transmissions11's solmate implementation.
   * @notice Ref: https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol
   */
  function DOMAIN_SEPARATOR() public view virtual returns (bytes32) {
    return
      block.chainid == INITIAL_CHAIN_ID
        ? INITIAL_DOMAIN_SEPARATOR
        : computeDomainSeparator();
  }

  /**
   * @dev Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
   * @dev https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
   * @dev Adds the {permit} method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by
   * @dev presenting a message signed by the account. By not relying on {IERC20-approve}, the token holder account doesn't
   * @dev need to send a transaction, and thus is not required to hold Ether at all.
   * @notice This method is copied from transmissions11's solmate implementation.
   * @notice Ref: https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol
   */
  function permit(
    address _owner,
    address _spender,
    uint256 _value,
    uint256 _deadline,
    uint8 _v,
    bytes32 _r,
    bytes32 _s
  ) public virtual {
    require(_deadline >= block.timestamp, "PERMIT_DEADLINE_EXPIRED");

    // Unchecked because the only math done is incrementing
    // the owner's nonce which cannot realistically overflow.
    unchecked {
      address recoveredAddress = ecrecover(
        keccak256(
          abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR(),
            keccak256(
              abi.encode(
                keccak256(
                  "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
                ),
                _owner,
                _spender,
                _value,
                nonces[_owner]++,
                _deadline
              )
            )
          )
        ),
        _v,
        _r,
        _s
      );

      require(
        recoveredAddress != address(0) && recoveredAddress == _owner,
        "INVALID_SIGNER"
      );

      _value = allowance(recoveredAddress, _spender);
    }

    emit Approval(_owner, _spender, _value);
  }

  /**
   * @dev Compute the domain separator used in the encoding of the signature for {permit}, as defined by {EIP712}.
   * @notice This method is based from transmissions11's solmate implementation.
   * @notice Ref: https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol
   */
  function computeDomainSeparator() internal view virtual returns (bytes32) {
    return
      keccak256(
        abi.encode(
          keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
          ),
          keccak256(bytes(name())),
          keccak256("1"),
          block.chainid,
          address(this)
        )
      );
  }

  /*************
   * INTERNALS *
   *************/

  /**
   * @dev Return if the `_account` is a minter or not.
   * @param _account Address to check
   * @return True if the `_account` is minter
   */
  function isMinter(address _account) internal view returns (bool) {
    return _minters[_account];
  }

  /**
   * @dev Add a new minter.
   * @param _account Address of the minter
   */
  function _addMinter(address _account) private {
    _minters[_account] = true;
    emit MinterAdded(_account);
  }

  /**
   * @dev Remove a minter.
   * @param _account Address of the minter
   */
  function _removeMinter(address _account) private {
    _minters[_account] = false;
    emit MinterRemoved(_account);
  }
}
