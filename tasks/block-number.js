const {task} = require("hardhat/config");
// we are gonna create a task jisse we can get the block number of the current state

task("block-number", "Prints the current block number")
    //.addParam() no params in this
    .setAction(async(taskArgs, hre)=>{ // isme no arguments
        const blockNum = await hre.ethers.provider.getBlockNumber();
        console.log(blockNum); // prints our block num
        // iske baad if we type npx hardhat, it wont show in the list of tasks there, we first need to import this in our configs file

    })
module.exports={}
// what is hre => hardhat runtime environment
// hre can access a lot of packages that hardhat can
// when we call this task on the hardhat network, it will give us 0
// because our network is being reset everytime
// when we call it for goerli, we get the block num of goerli
// ^^ called using --network goerli like usual