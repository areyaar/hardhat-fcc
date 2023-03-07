require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// network me kuch nahi hai toh automatically wo hardhat ke network pe deploy kar raha hai
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // kuch nahi tha fir specify kia network hardhat, still will work the same but humne specify kar dia
  networks:{
    goerli:{
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
      chainId: 5
    }
  }, // iske andar koi bhi network dal do to use
  solidity: "0.8.18",
};
