import { Address, Deployer } from "../web3webdeploy/types";
import { DeployCounterSettings, deployCounter } from "./counters/Counter";
import {
  deployCounterDeployer,
  DeployCounterDeployerSettings,
} from "./counters/CounterDeployer";
import {
  deployDeployedCounter,
  DeployDeployedCounterSettings,
} from "./counters/DeployedCounter";
import {
  DeployProxyCounterSettings,
  deployProxyCounter,
} from "./counters/ProxyCounter";
import {
  SetInitialCounterValueSettings,
  setInitialCounterValue,
} from "./counters/SetInitialCounterValue";

export interface DeploymentSettings {
  counterDeployerSettings: DeployCounterDeployerSettings;
  deployedCounterSettings: Omit<
    DeployDeployedCounterSettings,
    "counterDeployer"
  >;
  forceRedeploy?: boolean;
}

export interface Deployment {
  counterDeployer: Address;
  deployedCounter: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: DeploymentSettings
): Promise<Deployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "V2.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const counterDeployer = await deployCounterDeployer(
    deployer,
    settings?.counterDeployerSettings ?? {}
  );
  const deployedCounter = await deployDeployedCounter(deployer, {
    ...(settings?.deployedCounterSettings ?? {}),
    counterDeployer: counterDeployer,
  });

  const deployment = {
    counterDeployer: counterDeployer,
    deployedCounter: deployedCounter,
  };
  await deployer.saveDeployment({
    deploymentName: "V2.json",
    deployment: deployment,
  });
  return deployment;
}
