const hre = require("hardhat");

async function main() {
  const Coffe = await hre.ethers.getContractFactory("Coffe");
  const coffe = await Coffe.deploy();

  await coffe.deployed();

  console.log(`Coffe deployed to ${coffe.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
