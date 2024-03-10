import { Address, Deployer } from "../web3webdeploy/types";
import { DeployCounterSettings, deployCounter } from "./counters/Counter";
import {
  DeployProxyCounterSettings,
  deployProxyCounter,
} from "./counters/ProxyCounter";
import {
  SetInitialCounterValueSettings,
  setIntialCounterValue,
} from "./counters/SetInitialCounterValue";

export interface DeploymentSettings {
  counterSettings: DeployCounterSettings;
  proxyCounterSettings: Omit<DeployProxyCounterSettings, "counter">;
  setIntialCounterValueSettings: Omit<
    SetInitialCounterValueSettings,
    "counter"
  >;
  forceRedeploy?: boolean;
}

export interface Deployment {
  counter: Address;
  proxyCounter: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: DeploymentSettings
): Promise<Deployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    return await deployer.loadDeployment({ deploymentName: "latest.json" });
  }

  const counter = await deployCounter(
    deployer,
    settings?.counterSettings ?? {}
  );
  const proxyCounter = await deployProxyCounter(deployer, {
    ...(settings?.proxyCounterSettings ?? {}),
    counter: counter,
  });
  await setIntialCounterValue(deployer, {
    ...(settings?.setIntialCounterValueSettings ?? { counterValue: BigInt(3) }),
    counter: counter,
  });

  const deployment = {
    counter: counter,
    proxyCounter: proxyCounter,
  };
  await deployer.saveDeployment({
    deploymentName: "latest.json",
    deployment: deployment,
  });
  return deployment;
}
