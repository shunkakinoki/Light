import type { LightCore } from "@lightdotso/typechain/src/contracts/core/src/LightCore";
import { expect } from "chai";
import { ethers } from "hardhat";
import "@lightdotso/hardhat";

describe("Core", () => {
  it("Deploy Light Core", async () => {
    const LightCoreFactory = await ethers.getContractFactory("LightCore");

    const LightCore = (await LightCoreFactory.deploy()) as LightCore;

    expect(await LightCore.owner()).equal(ethers.constants.AddressZero);
  });
});
