// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;
import "../src/BaseTest.sol";

contract BaseTestTest is BaseTest {
  function testDeployLightProxies() public {
    setUpLightProxies();
  }

  function testLightOrbProxySlot() public {
    setUpLightProxies();

    _testProxyImplementationSlot(
      address(proxyLightOrb),
      address(implementationLightOrb)
    );

    // Initializable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    vm.expectEmit(true, false, false, true);
    emit Initialized(2);
    wrappedLightOrb.initialize("Light Orb", "LORB");

    // Initializable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// ERC721Upgradeable.sol
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(251)),
      bytes32(
        0x4c69676874204f72620000000000000000000000000000000000000000000012
      )
    );
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(252)),
      bytes32(
        0x4c4f524200000000000000000000000000000000000000000000000000000008
      )
    );
  }

  function testLightOrbFactoryProxySlot() public {
    setUpLightProxies();

    // Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(this), address(this));
    emit OwnershipTransferred(address(0), address(proxyLightOrbFactory));
    emit Initialized(2);
    wrappedLightOrbFactory.initialize(address(empty));

    // Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    _testProxyImplementationSlot(
      address(proxyLightOrbFactory),
      address(implementationLightOrbFactory)
    );
  }

  function testLightSpaceProxySlot() public {
    setUpLightProxies();

    _testProxyImplementationSlot(
      address(proxyLightSpace),
      address(implementationLightSpace)
    );

    // Initializable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    vm.expectEmit(true, false, false, true);
    emit Initialized(2);
    wrappedLightSpace.initializeLightSpace();

    // Initializable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
  }
}
