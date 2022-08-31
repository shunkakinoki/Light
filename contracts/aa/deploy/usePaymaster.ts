/* eslint-disable no-console */

import * as ethers from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider, utils, Wallet } from "zksync-web3";

// Put the address of the deployed paymaster here
const PAYMASTER_ADDRESS = "0xF954a8A1cDaE85dee6D1ce3B9D306Ab77361cab3";

// Put the address of the ERC20 token here:
const TOKEN_ADDRESS = "0x5fb1536B16d31FE3b4E6Da8b4A72ae4dFa95a746";

// Wallet private key
const EMPTY_WALLET_PRIVATE_KEY =
  "0x558d9003d00a4c0e978ed273ef42942d8cbe9dbb9cad820a97316dfaaea38c7a";

// eslint-disable-next-line func-style
function getToken(hre: HardhatRuntimeEnvironment, wallet: Wallet) {
  const artifact = hre.artifacts.readArtifactSync("MyERC20");
  return new ethers.Contract(TOKEN_ADDRESS, artifact.abi, wallet);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = new Provider(hre.config.zkSyncDeploy.zkSyncNetwork);
  const emptyWallet = new Wallet(EMPTY_WALLET_PRIVATE_KEY, provider);

  // Obviously this step is not required, but it is here purely to demonstrate
  // that indeed the wallet has no ether.
  const ethBalance = await emptyWallet.getBalance();
  if (!ethBalance.eq(0)) {
    throw new Error("The wallet is not empty");
  }

  console.log(
    `Balance of the user before mint: ${await emptyWallet.getBalance(
      TOKEN_ADDRESS,
    )}`,
  );

  const erc20 = getToken(hre, emptyWallet);

  // Encoding the "ApprovalBased" paymaster flow's input
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
    type: "ApprovalBased",
    token: TOKEN_ADDRESS,
    minimalAllowance: ethers.BigNumber.from(1),
    innerInput: new Uint8Array(),
  });

  await (
    await erc20.mint(emptyWallet.address, 100, {
      customData: {
        paymasterParams,
        ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
      },
    })
  ).wait();

  console.log(
    `Balance of the user after mint: ${await emptyWallet.getBalance(
      TOKEN_ADDRESS,
    )}`,
  );
}
