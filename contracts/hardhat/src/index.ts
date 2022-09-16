import type {
  EmptyUUPS,
  LightCore,
  LightController,
  UUPSProxy,
  LightOperatorStore,
  LightOrb,
  LightOrbFactory,
  LightSpace,
  LightXP,
} from "@lightdotso/typechain";
import type { Contract } from "ethers";
import { utils } from "ethers";
import { ethers, upgrades } from "hardhat";

export let wrappedLightCore: LightCore;
export let wrappedLightController: LightController;
export let wrappedLightOperatorStore: LightOperatorStore;
export let wrappedLightOrb: LightOrb;
export let wrappedLightOrbFactory: LightOrbFactory;
export let wrappedLightSpace: LightSpace;
export let wrappedLightXP: LightXP;

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

  const deployUUPSBeacon = async (initParams: any[]) => {
    const contract = await upgrades.deployProxy(
      emptyUUPSBeaconFactory,
      initParams,
      {
        kind: "uups",
      },
    );
    await contract.deployed();
    return contract as UUPSProxy;
  };

  const empty = (await deployContract("Empty")) as Contract;

  const proxyLightCore = (await deployUUPS()) as UUPSProxy;
  const proxyLightController = (await deployUUPS()) as UUPSProxy;
  const proxyLightOperatorStore = (await deployUUPS()) as UUPSProxy;
  const proxyLightOrb = (await deployUUPS()) as UUPSProxy;
  const proxyLightOrbFactory = (await deployUUPSBeacon([
    empty.address,
  ])) as UUPSProxy;
  const proxyLightSpace = (await deployUUPS()) as UUPSProxy;
  const proxyLightXP = (await deployUUPS()) as UUPSProxy;

  // const emptyProxyLightCore = proxyLightCore as EmptyUUPS;
  // await emptyProxyLightCore.initialize();

  await deployContract("LightCore");
  wrappedLightCore = (await upgradeUUPS(
    proxyLightCore.address,
    "LightCore",
  )) as unknown as LightCore;
  wrappedLightController = (await upgradeUUPS(
    proxyLightController.address,
    "LightController",
  )) as unknown as LightController;
  wrappedLightOperatorStore = (await upgradeUUPS(
    proxyLightOperatorStore.address,
    "LightOperatorStore",
  )) as unknown as LightOperatorStore;
  wrappedLightOrb = (await upgradeUUPS(
    proxyLightOrb.address,
    "LightOrb",
  )) as unknown as LightOrb;
  wrappedLightOrbFactory = (await upgradeUUPS(
    proxyLightOrbFactory.address,
    "LightOrbFactory",
  )) as unknown as LightOrbFactory;
  wrappedLightSpace = (await upgradeUUPS(
    proxyLightSpace.address,
    "LightSpace",
  )) as unknown as LightSpace;
  wrappedLightXP = (await upgradeUUPS(
    proxyLightXP.address,
    "LightXP",
  )) as unknown as LightXP;

  wrappedLightController.initialize();
  wrappedLightController.setContractProxy(
    utils.id("LightCore"),
    proxyLightCore.address,
  );
  wrappedLightController.setContractProxy(
    utils.id("LightController"),
    proxyLightController.address,
  );
  wrappedLightController.setContractProxy(
    utils.id("LightOperatorStore"),
    proxyLightOperatorStore.address,
  );
  wrappedLightController.setContractProxy(
    utils.id("LightOrb"),
    proxyLightOrb.address,
  );
  wrappedLightController.setContractProxy(
    utils.id("LightOrbFactory"),
    proxyLightOrbFactory.address,
  );
  wrappedLightController.setContractProxy(
    utils.id("LightSpace"),
    proxyLightSpace.address,
  );
  wrappedLightController.setContractProxy(
    utils.id("LightXP"),
    proxyLightXP.address,
  );
});
