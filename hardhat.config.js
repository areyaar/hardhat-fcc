require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); // ye sara kaam karega apna for verification, bas api key laake dedo ise etherscan se
// network me kuch nahi hai toh automatically wo hardhat ke network pe deploy kar raha hai
// we get a task called verify in npx hardhat ^^ iske karan

require("hardhat-gas-reporter"); // gas reporter plugin
require("solidity-coverage"); //niche code me kuch nai likh rahe matlab we are using the default for it
// command -> npx hardhat coverage -> poora data de dega kitna kya cover nahi hai -> tell us increment and decrement fn nahi hai covered

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
  gasReporter:{
    enabled: false, // pehle console me output de raha tha, will set it false when we dont want to do thet gas thing 
    outputFile: "gas-report.txt", // isse we are getting output in a file, gitignore me is file ko add kar dia
    noColors: true,
    currency: "USD", // in order to get the price in usd apne ko api ka use karna padega, see below, we will need coinmarketcap ka api key
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
