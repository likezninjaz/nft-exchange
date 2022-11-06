async function main() {
  // const NFTBartex = await ethers.getContractFactory("NFTBartex");

  // console.log("Deploying on", hre.network.name);

  // console.log("Deploying NFTBartex...");
  // const NFTBartexContract = await NFTBartex.deploy();
  // console.log("NFTBartex deployed to:", NFTBartexContract.address);

  // console.log("Waiting for confirmation");
  // await NFTBartexContract.deployed();

  console.log("Verify the contract:", '0x023405Df595623eeaa36857E0F4C388b2EFDBB0C');

  try {
    await hre.run('verify:verify', {
      address: '0x023405Df595623eeaa36857E0F4C388b2EFDBB0C',
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
