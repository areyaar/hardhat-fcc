const {ethers} = require("hardhat");
const {assert} = require("chai"); // assert fn import kiye to throw errors when condn not met

describe("SimpleStorage", ()=>{
    let simpleStorageFactory, simpleStorage;
    beforeEach(async()=>{
        simpleStorageFactory=await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    })// it will be executed first, isme we will set up contract factory and deploy the contract

    it("should initialize the storage value as 0", async()=>{
        const value = await simpleStorage.get();
        const expectedVal = 0;
        assert.equal(value.toString(), expectedVal);
    })// it fn ke andar, we specify the requirements
    it("should update the number correctly", async()=>{
        const transactionResponse = await simpleStorage.set(7); // remember transaction value is the return of set fn
        transactionResponse.wait(1);
        const value = await simpleStorage.get();
        const expectedVal = 7;
        assert.equal(value.toString(), expectedVal);
    })

    // it.only(baaki sab same) -> it will only run this test
    // to run a specific test only -> npx hardhat test -grep <a unique word in the string of it statement>
    // ^^ will search the word in the string and only fire that test!


})
