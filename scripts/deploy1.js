const {ethers, run, network} = require("hardhat"); // run will help us run any tasks such as verify
// deploy krna aa gaya testnet pe hardhat se, ab there is a function in the block explorer called verify, usme our smart contract code is put on the block explorer,
// we can do that in the block explorer website, but we can do it in code too, that is programmatic verification
// we can do it with etherscan ka API where we have to send raw api calls
// but there is a much better thing here called hardhat plugins
// plugin named hardhat-etherscan will do our work here
// npm install --save-dev @nomiclabs/hardhat-etherscan
// config file me plugin require karna hai

// imorting network from hardhat gives us the info about network, useful when we want to check if it is actual network or our hardhat network
// to check if we want to use the verify fn
async function main() {
  const StorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying")
  const simpleStorage = await StorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("contract deployed");
  console.log(simpleStorage.address);
  //console.log(network.config); // it will give a lot of data, uske andar chainId hogi, hardhat ki chainId 31337 hai, usko chill kr denge if statement se

  //what happens to the verify fn if we deploy to our hardhat network? -> wont work
  if(network.config.chainId!=31337&&process.env.ETHERSCAN_API_KEY){ //also checks if api key exists in .env
    await simpleStorage.deployTransaction.wait(6); //just after deploying, etherscan might not know about our contract, so we wait a bit to make sure
    await verify(simpleStorage.address, []); // will test later
  }

}
// this fn will verify our contracts
async function verify(contractAddress, args){
    console.log("Verification Begin");
    try{
        await run("verify:verify", { // task verify ka subtask verify, there are a lot of subtasks //npx hardhat verify --help
            address: contractAddress,
            constructorArguments: args
          });
    } // sometimes it will be already verified, and give an error, so try catch here
    catch(e){
        if(e.msg.toLowerCase().includes("already verified")){
            console.log("ALready Verified!");
        }else {
            console.log(e);
        }
    }
     // task verify ka subtask verify, there are a lot of subtasks //npx hardhat verify --help
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
