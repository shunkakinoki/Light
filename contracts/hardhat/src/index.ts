import type { EmptyUUPS, LightCore, UUPSProxy } from "@lightdotso/typechain";
import { ethers, upgrades } from "hardhat";

export let wrappedLightCore: LightCore;
export let wrappedLightController: LightCore;
export let wrappedLightOperatorStore: LightCore;
export let wrappedLightOrb: LightCore;
export let wrappedLightOrbFactory: LightCore;
export let wrappedLightSpace: LightCore;
export let wrappedLightXP: LightCore;

before(async () => {
  // const emptyFactory = await ethers.getContractFactory("Empty");
  const emptyUUPSFactory = await ethers.getContractFactory("EmptyUUPS");
  const emptyUUPSBeaconFactory = await ethers.getContractFactory(
    "EmptyUUPSBeacon",
  );

  const deployContract = async (
    contractName: string,
    initParams: any[] = [],
  ) => {
    const contractFactory = await ethers.getContractFactory(contractName);
    const contract = await contractFactory.deploy(initParams);
    await contract.deployed();
    return contract;
  };

  const deployUUPS = async () => {
    const contract = await upgrades.deployProxy(emptyUUPSFactory, [], {
      kind: "uups",
    });
    await contract.deployed();
    return contract as UUPSProxy;
  };

  const upgradeUUPS = async (address: string, contractName: string) => {
    const contractFactory = await ethers.getContractFactory(contractName);
    const contract = await upgrades.upgradeProxy(address, contractFactory);
    return contract as EmptyUUPS;
  };

  const deployUUPSBeacon = async () => {
    const contract = await upgrades.deployProxy(emptyUUPSBeaconFactory, [], {
      kind: "uups",
    });
    await contract.deployed();
    return contract as UUPSProxy;
  };

  const proxyLightCore = await deployUUPS();
  const proxyLightController = await deployUUPS();
  const proxyLightOperatorStore = await deployUUPS();
  // const proxyLightOrb = (await deployUUPS()) as UUPSProxy;
  // const proxyLightOrbFactory = (await deployUUPSBeacon()) as UUPSProxy;
  // const proxyLightSpace = (await deployUUPS()) as UUPSProxy;
  // const proxyLightXP = (await deployUUPS()) as UUPSProxy;

  // const emptyProxyLightCore = proxyLightCore as EmptyUUPS;
  // await emptyProxyLightCore.initialize();

  await deployContract("LightCore");
  wrappedLightCore = (await upgradeUUPS(
    proxyLightCore.address,
    "LightCore",
  )) as unknown as LightCore;
});
