/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/deployer/LightOrbDeployerScript.s.sol";
import "@lightdotso/deployer/LightControllerDeployerScript.s.sol";

import "./LightOrbDeployerScript.t.sol";

contract LightControllerDeployerScriptTest is BaseTest {
  LightControllerDeployerScript script;
  LightOrbDeployerScript lightOrbScript;

  function setUp() public {
    lightOrbScript = new LightOrbDeployerScript();
    lightOrbScript.run();

    script = new LightControllerDeployerScript();
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(false, false, false, false);
    vm.expectEmit(true, false, false, false);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(false, false, false, false);
    vm.expectEmit(false, false, false, false);
    vm.expectEmit(true, false, false, true);
    emit Initialized(255);
    emit Initialized(255);
    emit Upgraded(address(0xf00));
    emit OwnershipTransferred(address(0), address(0xf00));
    emit Initialized(1);
    emit Upgraded(address(0xf00));
    emit OwnershipTransferred(address(0xf00), address(0xf00));
    emit Initialized(2);
    script.run();
  }

  function testLightControllerDeployerScriptImplementationSlot() public {
    _testProxyImplementationSlot(
      address(script.proxyLightController()),
      address(script.implementationLightController())
    );
  }

  function testLightControllerDeployerScriptStorageSlot() public {
    /// LightPausableUpgradeable (Initializable)
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// LightPausableUpgradeable (OwnableUpgradeable)
    _testArbitrarySlotNotEmpty(
      address(script.proxyLightController()),
      bytes32(uint256(51))
    );
    /// LightPausableUpgradeable (UUPSUpgradeable)
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightPausableUpgradeable (PausableUpgradeable)
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// LightControllerStorageV1
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(251))
        )
      ),
      bytes32(
        uint256(uint160(address(0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed)))
      )
    );
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(
        keccak256(
          abi.encodePacked(
            abi.encode(keccak256("LightOperatorStore")),
            uint256(251)
          )
        )
      ),
      bytes32(
        uint256(uint160(address(0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed)))
      )
    );
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(251))
        )
      ),
      bytes32(
        uint256(uint160(address(0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed)))
      )
    );
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(
        keccak256(
          abi.encodePacked(
            abi.encode(keccak256("LightOrbFactory")),
            uint256(251)
          )
        )
      ),
      bytes32(
        uint256(uint160(address(0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed)))
      )
    );
    _testArbitrarySlot(
      address(script.proxyLightController()),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(251))
        )
      ),
      bytes32(
        uint256(uint160(address(0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed)))
      )
    );
  }
}
