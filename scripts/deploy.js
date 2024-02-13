// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const lock = await hre.ethers.deployContract("DoctorPatient");

  await lock.waitForDeployment();

  console.log(`deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors. 0xF12Df35B2B2a8b1d0B698891ad150510dF289359 
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
