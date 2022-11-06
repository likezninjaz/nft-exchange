const { expect } = require('chai');
const { ethers } = require('hardhat');

const { setup } = require('./setup');

let NFTBartexContract;

describe('NFT Bartex contract unit tests', () => {
  beforeEach(async () => {
    const utils = await setup();
    NFTBartexContract = utils.NFTBartexContract;
  });

  it('Current Bartex index', async () => {
    expect(await NFTBartexContract.bartexIndex()).to.equal(0);
  });

  it('Create an bartex', async () => {
    const [owner, account1] = await ethers.getSigners();
    await NFTBartexContract.connect(account1).createBartex('0xC8851E809c1625B93f849fF5A0F9434B44e40773', 12);
    const bartex = await NFTBartexContract.bartexes(1);
    expect(bartex.contractAddress).to.equal('0xC8851E809c1625B93f849fF5A0F9434B44e40773');
    expect(bartex.tokenId.toNumber()).to.equal(12);
    expect(bartex.status).to.equal(0);
  });

  it('Create an offer', async () => {
    const [owner, account1] = await ethers.getSigners();
    // await expect(NFTBartexContract.connect(account1).createOffer(10, '0xC8851E809c1625B93f849fF5A0F9434B44e40773', 55)).revertedWith('Bartex does not exist')
    await NFTBartexContract.connect(account1).createBartex('0xC8851E809c1625B93f849fF5A0F9434B44e40773', 12);
    await NFTBartexContract.connect(account1).createOffer(1, '0xC8851E809c1625B93f849fF5A0F9434B44e40773', 55);
    await NFTBartexContract.connect(account1).createOffer(1, '0xC8851E809c1625B93f849fF5A0F9434B44e40773', 57);
    await NFTBartexContract.connect(account1).createOffer(1, '0xC8851E809c1625B93f849fF5A0F9434B44e40773', 58);
    const offer = await NFTBartexContract.offers(1);
    const bartexOffers = await NFTBartexContract.getBartexOffers(1);
    expect(offer.contractAddress).to.equal('0xC8851E809c1625B93f849fF5A0F9434B44e40773');
    expect(offer.tokenId.toNumber()).to.equal(55);
    expect(bartexOffers[2].toNumber()).to.equal(3);
    expect(bartexOffers.length).to.equal(3);
  });
});
