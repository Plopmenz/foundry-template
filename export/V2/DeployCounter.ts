export const DeployCounterContract = {
  address: "0x70114A6405F341F4AAe67f0C7a889d873a5c0202",
  abi: [
    {
      type: "function",
      name: "getNumber",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "increment",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "setNumber",
      inputs: [{ name: "newNumber", type: "uint256", internalType: "uint256" }],
      outputs: [],
      stateMutability: "nonpayable",
    },
  ],
} as const;
