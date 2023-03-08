const {ethers, run, network} = require("hardhat"); 

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
