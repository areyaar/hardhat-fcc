const {ethers, run, network} = require("hardhat"); 
// deploy done verify done, now we need to interact with the contract, the most important thing
// how do we do that? pehle jaise hi, js se
// also jo normal deploy command we are using npx hardhat run scripts/deploy2.js, usse compile b ho jata contract, artifacts folder, cache wagera sab ban jata hai


// ab interaction is done, we now come to custom hardhat tasks they can be written in the configs file
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
