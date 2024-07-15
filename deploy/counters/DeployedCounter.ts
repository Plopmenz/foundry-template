import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";

export interface DeployDeployedCounterSettings
  extends Omit<DeployInfo, "contract" | "args"> {
  counterDeployer: Address;
}

export async function deployDeployedCounter(
  deployer: Deployer,
  settings: DeployDeployedCounterSettings
): Promise<Address> {
  const deployCounter = await deployer.execute({
    id: "DeployCounter",
    abi: "CounterDeployer",
    to: settings.counterDeployer,
    function: "deploy",
  });

  const CounterDeployedEvents = await deployer.getEvents({
    abi: "CounterDeployer",
    logs: deployCounter.receipt.logs,
    address: settings.counterDeployer,
    eventName: "CounterDeployed",
  });

  const deployCounterAddress = CounterDeployedEvents.at(0)?.args?.counter;
  if (
    !deployCounterAddress ||
    typeof deployCounterAddress !== "string" ||
    !deployer.viem.isAddress(deployCounterAddress)
  ) {
    throw new Error("CounterDeployed event could not be found");
  }

  await deployer.addDeploy({
    addTo: "DeployCounter",
    id: "DeployCounter",
    contract: "Counter",
    deploymentAddress: deployCounterAddress,
  });

  return deployCounterAddress;
}
