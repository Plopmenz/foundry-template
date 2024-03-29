import { Address, Deployer, ExecuteInfo } from "../../web3webdeploy/types";

export interface SetInitialCounterValueSettings
  extends Omit<ExecuteInfo, "abi" | "to" | "function" | "args"> {
  counter: Address;
  counterValue: bigint;
}

export async function setInitialCounterValue(
  deployer: Deployer,
  settings: SetInitialCounterValueSettings
): Promise<void> {
  await deployer.execute({
    id: "InitialCounterNumber",
    abi: "Counter",
    to: settings.counter,
    function: "setNumber",
    args: [settings.counterValue],
    ...settings,
  });
}
