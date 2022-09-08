import type { LightCore } from "@lightdotso/typechain/src/contracts/core/src/LightCore";
import type { UUPSProxy } from "@lightdotso/typechain/src/contracts/proxies/src/UUPSProxy";
import { ethers, upgrades } from "hardhat";

export let proxyLightCore: LightCore;
export let proxyLightController: LightCore;
export let proxyLightOperatorStore: LightCore;
export let proxyLightOrb: LightCore;
export let proxyLightOrbFactory: LightCore;
export let proxyLightSpace: LightCore;
export let proxyLightXP: LightCore;

before(async () => {
  // const emptyFactory = await ethers.getContractFactory("Empty");
  const emptyUUPSFactory = await ethers.getContractFactory("EmptyUUPS");
  const emptyUUPSBeaconFactory = await ethers.getContractFactory(
    "EmptyUUPSBeacon",
  );

  const deployUUPS = async () => {
    const contract = await upgrades.deployProxy(emptyUUPSFactory, [], {
      kind: "uups",
    });
    await contract.deployed();
    return contract as UUPSProxy;
  };

  const deployUUPSBeacon = async () => {
    const contract = await upgrades.deployProxy(emptyUUPSBeaconFactory, [], {
      kind: "uups",
    });
    await contract.deployed();
    return contract as UUPSProxy;
  };

  const proxyLightCore = (await deployUUPS()) as UUPSProxy;
  const proxyLightController = (await deployUUPS()) as UUPSProxy;
  const proxyLightOperatorStore = (await deployUUPS()) as UUPSProxy;
  // const proxyLightOrb = (await deployUUPS()) as UUPSProxy;
  // const proxyLightOrbFactory = (await deployUUPSBeacon()) as UUPSProxy;
  // const proxyLightSpace = (await deployUUPS()) as UUPSProxy;
  // const proxyLightXP = (await deployUUPS()) as UUPSProxy;
});
