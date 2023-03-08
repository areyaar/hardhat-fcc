require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); // ye sara kaam karega apna for verification, bas api key laake dedo ise etherscan se
// network me kuch nahi hai toh automatically wo hardhat ke network pe deploy kar raha hai
// we get a task called verify in npx hardhat ^^ iske karan

/** @type import('hardhat/config').HardhatUserConfig */

//importing tasks
require("./tasks/block-number");


module.exports = {
  defaultNetwork: "hardhat", // kuch nahi tha fir specify kia network hardhat, still will work the same but humne specify kar dia
  networks:{
    goerli:{
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
      chainId: 5
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
      // we don't need to add accounts here, hardhat will give it 10 fake accs

    }
  }, // iske andar koi bhi network dal do to use
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY // configured the programmatic verification here
  },
  solidity: "0.8.18",
};
