const {ethers} = require("hardhat"); // we are pulling ethers from hardhat, because we have a node package named hardhat-ethers, which combines hardhat and ethers
// hardhat se kia kuki ethers se karte to it doesn't know our contracts folder

async function main() {
  // now pull the contract factory
  const StorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying")
  const simpleStorage = await StorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("contract deployed");

  // pehle private key and rpc url use kar rahe the, abhi yaha nahi dali kuch bhi,
  // will it work?
  // npx hardhat run scripts/deploy.js
  console.log(simpleStorage.address); // we get an address back even if we didnt put in any rpc or private key, why?
  // hardhat has a local development network just like ganache, it allows to test contracts
  // this network already comes with a rpc and private key to use
  // hardhatconfig me jaake we can specify what network to use, if nothing is specified, it uses the hardhat network
  // if we wanna run on a specific network, we can type --network <name of network> just like truffle here
  // npx hardhat run scripts/deploy.js --network goerli
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
