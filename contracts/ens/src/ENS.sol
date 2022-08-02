// SPDX-License-Identifier: GPL-3.0

import { Initializable } from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

pragma solidity ^0.8.13;

// keccak256("diamond.storage.ens") == 0x4f4707426e020da116b902ef8ee5e6869278af651e437c2384d87675fd22ede9;
bytes32 constant DIAMOND_STORAGE_ENS = 0x4f4707426e020da116b902ef8ee5e6869278af651e437c2384d87675fd22ede9;

function s() pure returns (ENSDS storage diamondStorage) {
  assembly {
    diamondStorage.slot := DIAMOND_STORAGE_ENS
  }
}

struct ENSDS {
  address node;
}

abstract contract ENSBaseResolver {
  function resolver(bytes32 node) public view virtual returns (Resolver);
}

abstract contract Resolver {
  function addr(bytes32 node) public view virtual returns (address);
}

/// @title ENS
/// @author shunkakinoki (https://shunkakinoki.com)
/// @dev Requires `__ENS_init()` to be called in proxy
contract ENSResolver is Initializable {
  /// INTERNAL
  function __ENS_init(address _node) internal initializer {
    s().node = _node;
  }

  /// EXTERNAL
  function setNode(address _node) public {
    s().node = _node;
  }

  function resolve(bytes32 node) public view returns (address) {
    ENSBaseResolver ens = ENSBaseResolver(s().node);
    Resolver resolver = ens.resolver(node);
    return resolver.addr(node);
  }
}

contract ENS is ENSResolver {
  function initialize() public initializer {
    __ENS_init(address(this));
  }
}
