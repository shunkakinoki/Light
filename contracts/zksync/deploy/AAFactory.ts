import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { utils, Wallet } from "zksync-web3";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = new Wallet(
    "0x36e814d89dfeba68200d170d746b2d1f5edc1329f9099d224141978c4b58fc56",
  );
  const deployer = new Deployer(hre, wallet);
  const factoryArtifact = await deployer.loadArtifact("AAFactory");
  const aaArtifact = await deployer.loadArtifact("TwoUserMultisig");

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  // You can remove the depositing step if the `wallet` has enough funds on zkSync
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  await depositHandle.wait();

  // Getting the bytecodeHash of the account
  const bytecodeHash = utils.hashBytecode(aaArtifact.bytecode);

  const factory = await deployer.deploy(
    factoryArtifact,
    [bytecodeHash],
    undefined,
    [
      // Since the factory requires the code of the multisig to be available,
      // we should pass it here as well.
      aaArtifact.bytecode,
    ],
  );

  // eslint-disable-next-line no-console
  console.log(`AA factory address: ${factory.address}`);
}
