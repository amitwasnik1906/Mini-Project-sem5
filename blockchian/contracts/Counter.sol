// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public counter;

    // Constructor that initializes the counter to 0
    constructor() {
        counter = 0;
    }

    // Function to add 1 to the counter
    function add() public {
        counter += 1;
    }

    // Function to subtract 1 from the counter (ensure it doesn't go below 0)
    function remove() public {
        require(counter > 0, "Counter cannot be negative");
        counter -= 1;
    }

    // Function to add a specific value to the counter
    function addValue(uint256 value) public {
        counter += value;
    }

    // Function to remove a specific value from the counter (ensure it doesn't go below 0)
    function removeValue(uint256 value) public {
        require(counter >= value, "Counter cannot be negative");
        counter -= value;
    }

    // Function to get the current value of the counter
    function getCounter() public view returns (uint256) {
        return counter;
    }
}
