# Simple To-Do List Smart Contract 

This repository contains a Solidity smart contract that implements a decentralized To-Do List application. The contract allows an administrator to manage users, and registered users can add, view, complete, and remove their own tasks.

The project is developed using the Hardhat environment and has been successfully deployed to the Sepolia testnet.

📜 Contract Features
Admin Role: The address that deploys the contract is set as the admin.

User Management: Only the admin can add new users to the system. This prevents unauthorized access.

Task Management: Each user has their own private list of tasks.

addUser(address, name): Admin can add a new user.

addTask(userId, taskDetails): A registered user can add a new task to their list.

getTask(userId, taskId): A user can retrieve the details of a specific task.

markAsCompleted(userId, taskId): A user can mark one of their tasks as complete.

removeTask(userId, taskId): A user can remove a task. (Note: This implementation sets the task as non-existent rather than resizing the array to save gas).

Events: The contract emits events (UserAdded, TaskAdded, TaskRemoved) to allow for easier off-chain monitoring of contract activity.

🛠️ Technologies Used
Solidity (^0.8.9): The smart contract language.

Hardhat: Ethereum development environment for compiling, testing, and deploying the contract.

Ethers.js: Used in Hardhat scripts to interact with the deployed contract.

dotenv: To manage environment variables like private keys and RPC URLs securely.

🚀 Deployment Details
The contract has been successfully deployed to the Sepolia testnet.

	Contract Address - 0x583bF2520c94f7c94Ea9bA3393ee82380eDf5d2F	(View on Sepolia Etherscan)
