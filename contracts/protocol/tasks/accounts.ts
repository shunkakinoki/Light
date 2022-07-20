import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    // eslint-disable-next-line no-console
    console.log(account.address);
  }
});
