export const CounterDeployerContract = {
  address: "0xC71E721dC8312370397dC6DccFbA977364BF84a4",
  abi: [
    {
      type: "function",
      name: "deploy",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "CounterDeployed",
      inputs: [
        {
          name: "counter",
          type: "address",
          indexed: false,
          internalType: "contract Counter",
        },
      ],
      anonymous: false,
    },
  ],
} as const;
