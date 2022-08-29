// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { ILightSpace } from "@lightdotso/protocol/interfaces/ILightSpace.sol";
import { LightOperatable } from "@lightdotso/protocol/abstract/LightOperatable.sol";
import { LightSpaceStorageV1 } from "@lightdotso/protocol/storages/LightSpaceStorage.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

/// @title Space contract for the Light protocol.
/// @dev Light spaces are a collective of orbs.
/// @author Shun Kakinoki
//// @notice Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf.
//// @notice Implemented based of JBProjects at https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBProjects.sol (MIT License)
contract LightSpace is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  ERC721Upgradeable,
  LightOperatable,
  LightSpaceStorageV1,
  ILightSpace
{
  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                       UPGRADEABLE                          */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address _controller) external reinitializer(2) {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __ERC721_init("Light Space", "LIGHTSPACE");

    _setController(_controller);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                      EXTERNAL VIEWS                        */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
    @notice The count for the total number of projects.
  */
  function getCount() external view returns (uint256) {
    return count;
  }

  /**
    @notice The metadata for each project, which can be used across several domains.
    @param  _projectId The ID of the project to which the metadata belongs.
    @param  _domain The domain within which the metadata applies. Applications can use the domain namespace as they wish.
  */
  function getMetadataContentOf(uint256 _projectId, uint256 _domain)
    external
    view
    returns (string memory)
  {
    return metadataContentOf[_projectId][_domain];
  }
}
