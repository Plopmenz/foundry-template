import { Deployer } from "../web3webdeploy/types";
import { deployCounter } from "./counters/Counter";
import { deployProxyCounter } from "./counters/ProxyCounter";

export async function deploy(deployer: Deployer) {
  console.log("Starting deployment");
  const counterAddress = await deployCounter(deployer);
  await deployProxyCounter(deployer, counterAddress);
  console.log("Finished deployment");
}
