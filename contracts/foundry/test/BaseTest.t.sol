// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;
import "../src/BaseTest.sol";

contract BaseTestTest is BaseTest {
  function testDeployLightProxies() public {
    deployLightProxies();
  }

  function testLightOrbProxySlot() public {
    deployLightProxies();

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

    wrappedLightOrb.initializeLightOrb();

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

  function testLightSpaceProxySlot() public {
    deployLightProxies();

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

  function testLightSpaceFactoryProxySlot() public {
    deployLightProxies();

    // Initializable
    _testArbitrarySlot(
      address(wrappedLightSpaceFactory),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(wrappedLightSpaceFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    wrappedLightSpaceFactory.initializeLightSpaceFactory(address(empty));

    // Initializable
    _testArbitrarySlot(
      address(wrappedLightSpaceFactory),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(wrappedLightSpaceFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    _testProxyImplementationSlot(
      address(wrappedLightSpaceFactory),
      address(implementationLightSpaceFactory)
    );
  }
}
