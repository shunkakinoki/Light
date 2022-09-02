// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightController } from "@lightdotso/controller/ILightController.sol";
import { ILightManager } from "@lightdotso/manager/ILightManager.sol";
import { ILightCore } from "@lightdotso/core/ILightCore.sol";
import { ILightOperatorStore } from "@lightdotso/operator/ILightOperatorStore.sol";
import { ILightOrb } from "@lightdotso/orb/ILightOrb.sol";
import { ILightOrbFactory } from "@lightdotso/orb/ILightOrbFactory.sol";
import { ILightRewardsManager } from "@lightdotso/rewards/ILightRewardsManager.sol";
import { ILightSpace } from "@lightdotso/space/ILightSpace.sol";
import { ILightStaking } from "@lightdotso/staking/ILightStaking.sol";
import { ILightToken } from "@lightdotso/token/ILightToken.sol";
import { LightManagerStorageV1 } from "@lightdotso/manager/LightManagerStorage.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @title Manager contract for the Light protocol.
/// @title Keeps track of the references of the protocol.
/// @title Inherits the `LightManagerStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice Used for mostly inheriting storages in other protocol contracts.
/// @notice This contract is a fork from Graph Protocol's Managed (GPL-2.0-or-later)
/// @notice Ref: https://github.com/graphprotocol/contracts/blob/dev/contracts/governance/Managed.sol
contract LightManager is LightManagerStorageV1, ILightManager {
  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                        EXTERNAL                            */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
   * @dev Sync protocol contract addresses from the Controller registry.
   * @dev This function will cache all the contracts using the latest addresses
   * @dev Anyone can call the function whenever a Proxy contract change in the
   * @dev controller to ensure the protocol is using the latest version
   */
  function syncAllContracts() external {
    _syncContract("LightCore");
    _syncContract("LightOrb");
    _syncContract("LightOrbFactory");
    _syncContract("LightRewardsManager");
    _syncContract("LightSpace");
    _syncContract("LightStaking");
    _syncContract("LightToken");
  }

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                  INTERNAL VIEWER CONST                     */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
   * @dev Return LightOrb interface.
   * @return LightOrb contract registered with Controller
   */
  function lightCore() internal view returns (ILightCore) {
    return ILightCore(_resolveContract(keccak256("LightCore")));
  }

  /**
   * @dev Return LightOrb interface.
   * @return LightOrb contract registered with Controller
   */
  function lightOrb() internal view returns (ILightOrb) {
    return ILightOrb(_resolveContract(keccak256("LightOrb")));
  }

  /**
   * @dev Return LightOrbFactory interface.
   * @return LightOrbFactory contract registered with Controller
   */
  function lightOrbFactory() internal view returns (ILightOrbFactory) {
    return ILightOrbFactory(_resolveContract(keccak256("LightOrbFactory")));
  }

  /**
   * @dev Return LightRewardsManager interface.
   * @return LightRewardsManager manager contract registered with Controller
   */
  function lightRewardsManager() internal view returns (ILightRewardsManager) {
    return
      ILightRewardsManager(_resolveContract(keccak256("LightRewardsManager")));
  }

  /**
   * @dev Return LightSpace interface.
   * @return LightSpace manager contract registered with Controller
   */
  function lightSpace() internal view returns (ILightSpace) {
    return ILightSpace(_resolveContract(keccak256("LightSpace")));
  }

  /**
   * @dev Return LightRewardsManager interface.
   * @return LightRewardsManager manager contract registered with Controller
   */
  function lightStaking() internal view returns (ILightRewardsManager) {
    return ILightRewardsManager(_resolveContract(keccak256("LightStaking")));
  }

  /**
   * @dev Return ILightToken interface.
   * @return ILightToken manager contract registered with Controller
   */
  function lightToken() internal view returns (ILightToken) {
    return ILightToken(_resolveContract(keccak256("LightSpace")));
  }

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                        INTERNAL                            */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
   * @dev Set controller.
   * @param _controller Controller contract address
   */
  function _setController(address _controller) internal {
    require(_controller != address(0), "Controller must be set");
    controller = ILightController(_controller);
    emit SetController(_controller);
  }

  /**
   * @dev Resolve a contract address from the cache or the Controller if not found.
   * @return Address of the contract
   */
  function _resolveContract(bytes32 _nameHash) internal view returns (address) {
    address contractAddress = addressCache[_nameHash];
    if (contractAddress == address(0)) {
      contractAddress = controller.getContractProxy(_nameHash);
    }
    return contractAddress;
  }

  /**
   * @dev Cache a contract address from the Controller registry.
   * @param _name Name of the contract to sync into the cache
   */
  function _syncContract(string memory _name) internal {
    bytes32 nameHash = keccak256(abi.encodePacked(_name));
    address contractAddress = controller.getContractProxy(nameHash);
    if (addressCache[nameHash] != contractAddress) {
      addressCache[nameHash] = contractAddress;
      emit ContractSynced(nameHash, contractAddress);
    }
  }
}
