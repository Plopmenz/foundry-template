import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";
export interface DeployCounterDeployerSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export async function deployCounterDeployer(
  deployer: Deployer,
  settings: DeployCounterDeployerSettings
): Promise<Address> {
  return await deployer
    .deploy({
      id: "CounterDeployer",
      contract: "CounterDeployer",
      ...settings,
    })
    .then((deployment) => deployment.address);
}
