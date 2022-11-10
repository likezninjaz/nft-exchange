async function main() {
  // const NFTBartex = await ethers.getContractFactory("NFTBartex");

  // console.log("Deploying on", hre.network.name);

  // console.log("Deploying NFTBartex...");
  // const NFTBartexContract = await NFTBartex.deploy();
  // console.log("NFTBartex deployed to:", NFTBartexContract.address);

  // console.log("Waiting for confirmation");
  // await NFTBartexContract.deployed();

  console.log("Verify the contract:", '0x72CF00dDA0C877C588B7eCdaDc6F13FbAdb15BDF');

  try {
    await hre.run('verify:verify', {
      address: '0x72CF00dDA0C877C588B7eCdaDc6F13FbAdb15BDF',
      network: hre.network.name,
    });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
