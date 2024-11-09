const hre = require("hardhat");

async function main() {
  const Counter = await hre.ethers.getContractFactory("AbuseReporting");
  const counter = await Counter.deploy();

  // Wait for the contract to be mined
  await counter.waitForDeployment();

  console.log("ARS deployed to:", await counter.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });