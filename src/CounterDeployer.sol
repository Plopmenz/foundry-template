// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Counter} from "./Counter.sol";

contract CounterDeployer {
    event CounterDeployed(Counter counter);

    function deploy() external {
        Counter counter = new Counter();
        emit CounterDeployed(counter);
    }
}
