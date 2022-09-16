import {
  wrappedLightController,
  wrappedLightCore,
  wrappedLightOperatorStore,
  wrappedLightOrb,
  wrappedLightOrbFactory,
  wrappedLightSpace,
} from "@lightdotso/hardhat";
import type { LightController } from "@lightdotso/typechain";
import { expect } from "chai";
import { utils } from "ethers";
import { ethers } from "hardhat";

describe("LightController", () => {
  it("LightController: Deploy", async () => {
    const LightControllerFactory = await ethers.getContractFactory(
      "LightController",
    );

    const LightController =
      (await LightControllerFactory.deploy()) as LightController;

    expect(await LightController.owner()).equal(ethers.constants.AddressZero);
  });
  it("LightController: getContractProxy()", async () => {
    expect(
      await wrappedLightController.getContractProxy(utils.id("LightCore")),
    ).equal(wrappedLightCore.address);
    expect(
      await wrappedLightController.getContractProxy(
        utils.id("LightOperatorStore"),
      ),
    ).equal(wrappedLightOperatorStore.address);
    expect(
      await wrappedLightController.getContractProxy(utils.id("LightOrb")),
    ).equal(wrappedLightOrb.address);
    expect(
      await wrappedLightController.getContractProxy(
        utils.id("LightOrbFactory"),
      ),
    ).equal(wrappedLightOrbFactory.address);
    expect(
      await wrappedLightController.getContractProxy(utils.id("LightSpace")),
    ).equal(wrappedLightSpace.address);
  });
});
