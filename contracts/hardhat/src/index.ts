import { ethers } from "hardhat";

before(async () => {
  const [
    address0,
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
    address8,
  ] = await ethers.getSigners();

  // eslint-disable-next-line no-console
  console.log(address0);
});
