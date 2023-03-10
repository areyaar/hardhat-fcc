const {ethers, run, network} = require("hardhat"); 
// now all that set, we will look into how much gas each one of our fn costs
// npm hardhat-gas-reporter ->it is a hardhat plugin which attaches itself to the tests and shows in the console how much each fn costs
// config file me require karo

// another hardhat plugin that could come very useful to use is the solidity coverage
// this helps in preventing hacks, this plugin goes through our solidity code and the tests, and tells us which lines in solidity are not covered under the tests
// npm -> solidity-coverage
//config file me add karo isko bhi


async function main() {
    const StorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("deploying")
    const simpleStorage = await StorageFactory.deploy();
    await simpleStorage.deployed();
    console.log("contract deployed");
    console.log(simpleStorage.address);
  
    if(network.config.chainId!=31337&&process.env.ETHERSCAN_API_KEY){ 
        await simpleStorage.deployTransaction.wait(6); 
        await verify(simpleStorage.address, []); 
    } 
    let value = await simpleStorage.get();
    console.log(value.toString());
    await simpleStorage.set(8);
    await simpleStorage.deployTransaction.wait(1);
    value = await simpleStorage.get();
    console.log(value.toString());


}

async function verify(contractAddress, args){
    console.log("Verification Begin");
    try{
        await run("verify:verify", { 
            address: contractAddress,
            constructorArguments: args
          });
    } 
    catch(e){
        if(e.msg.toLowerCase().includes("already verified")){
            console.log("ALready Verified!");
        }else {
            console.log(e);
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
