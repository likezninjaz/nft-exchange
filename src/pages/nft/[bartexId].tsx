import { GetServerSideProps } from 'next';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import NFTBartexAbi from 'contracts/NFT-bartex.json';
import ERC721Abi from 'contracts/ERC721.json';
export { Nft as default } from 'layouts';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_NODE)
    );
    const contract = new web3.eth.Contract(
      NFTBartexAbi as AbiItem | AbiItem[],
      process.env.NEXT_PUBLIC_BARTEX_CONTRACT_ADDRESS
    );
    const bartex = await contract.methods.bartexes(query.bartexId).call();
    const nftContract = new web3.eth.Contract(
      ERC721Abi as AbiItem | AbiItem[],
      bartex.contractAddress
    );
    const tokenUri = await nftContract.methods.tokenURI(bartex.tokenId).call();
    const metadataResponse = await fetch(tokenUri);
    const metadata = await metadataResponse.json();

    return {
      props: {
        bartex: {
          bartexId: query.bartexId,
          tokenId: String(bartex.tokenId),
          name: String(metadata.name) || 'N/A',
          description: String(metadata.description) || 'N/A',
          image: String(metadata.image),
          contractAddress: bartex.contractAddress,
          tokenUri: tokenUri,
        },
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};
