const {ethers, run, network} = require("hardhat"); 
// so everytime we do the deploy command, ek network is created and the script khatam hone pe, the network is reset, how can we make it do something that outlives the script?
// just run npx hardhat node -> will run a local network other than hardhat
// localhost pe chal raha ye network, so if we add a localhost network in config and then use the deploy command in another console using that network while our node(npx hardhat node) is running, we will see the logs in the node console

// apan npx hardhat console bhi kar sakte hai, usse we get a running shell then we can interact with our contract
// usme contractfamily se deploy karna hoga
// first contractfamily, then then .deploy(), then run any functions like get and set

// now we move on to writing tests
// we can write in solidity and js, js is majorly used, so we use js
// mocha framework is use to write tests
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
