const { ethers } = require('hardhat');

const setup = async props => {
  const NFTBartexContractFactory = await ethers.getContractFactory('NFTBartex');
  const NFTBartexContract = await NFTBartexContractFactory.deploy();

  return { NFTBartexContract };
}

module.exports = { setup };
