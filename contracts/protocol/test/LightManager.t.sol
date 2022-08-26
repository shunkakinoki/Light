// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightManager.sol";

contract LightManagerTest is BaseTest {
  LightManager private lightManager;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightController() public {
    assertEq(
      address(wrappedLightManager.controller()),
      address(proxyLightController)
    );
  }

  function testSyncAllContracts() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightManager));
    vm.expectEmit(true, true, false, true, address(wrappedLightManager));
    vm.expectEmit(true, true, false, true, address(wrappedLightManager));
    emit ContractSynced(keccak256("LightOrb"), address(proxyLightOrb));
    emit ContractSynced(
      keccak256("LightOrbFactory"),
      address(proxyLightOrbFactory)
    );
    emit ContractSynced(keccak256("LightSpace"), address(proxyLightSpace));
    wrappedLightManager.syncAllContracts();
  }
}
