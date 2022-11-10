import { GetServerSideProps } from 'next';
import { times } from 'ramda';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import NFTBartexAbi from 'contracts/NFT-bartex.json';
import ERC721Abi from 'contracts/ERC721.json';
import { ENetwork } from '@types';
import { getContractAddressByChainId, getNodeByChainId } from 'utils';

export { Home as default } from 'layouts';

export const getServerSideProps: GetServerSideProps = async () => {
  const nfts = [];

  try {
    // const bnbWeb3 = new Web3(
    //   new Web3.providers.HttpProvider(
    //     getNodeByChainId(ENetwork.BNB)
    //   )
    // );
    // const bnbContract = new bnbWeb3.eth.Contract(
    //   NFTBartexAbi as AbiItem | AbiItem[],
    //   getContractAddressByChainId(ENetwork.BNB)
    // );

    const polygonWeb3 = new Web3(
      new Web3.providers.HttpProvider(getNodeByChainId(ENetwork.POLYGON))
    );
    const polygonContract = new polygonWeb3.eth.Contract(
      NFTBartexAbi as AbiItem | AbiItem[],
      getContractAddressByChainId(ENetwork.POLYGON)
    );

    // const bnbBartexAmount = await bnbContract.methods.bartexIndex().call();
    const polygonbartexAmount = await polygonContract.methods
      .bartexIndex()
      .call();

    // if (bnbBartexAmount > 0) {
    //   Promise.all(
    //     times(
    //       async i => {
    //         const bartex = await bnbContract.methods.bartexes(i + 1).call();
    //         const nftContract = new bnbWeb3.eth.Contract(
    //           ERC721Abi as AbiItem | AbiItem[],
    //           bartex.contractAddress
    //         );
    //         const tokenUri = await nftContract.methods
    //           .tokenURI(bartex.tokenId)
    //           .call();
    //         const metadataResponse = await fetch(tokenUri);
    //         const metadata = await metadataResponse.json();
    //         if (metadata && Object.keys(metadata).length > 0) {
    //           nfts.push({
    //             bartexId: i + 1,
    //             tokenId: String(bartex.tokenId),
    //             name: String(metadata.name) || 'N/A',
    //             image: String(metadata.image),
    //             contractAddress: bartex.contractAddress,
    //             tokenUri: tokenUri,
    //             chainId: ENetwork.BNB,
    //           });
    //         }
    //       },
    //       bnbBartexAmount < 6 ? bnbBartexAmount : 6
    //     )
    //   );
    // }

    if (polygonbartexAmount > 0) {
      await Promise.all(
        times(
          async i => {
            const bartex = await polygonContract.methods
              .bartexes(polygonbartexAmount - i)
              .call();
            const nftContract = new polygonWeb3.eth.Contract(
              ERC721Abi as AbiItem | AbiItem[],
              bartex.contractAddress
            );
            const tokenUri = await nftContract.methods
              .tokenURI(bartex.tokenId)
              .call();
            const metadataResponse = await fetch(tokenUri);
            const metadata = await metadataResponse.json();
            if (metadata && Object.keys(metadata).length > 0) {
              nfts.push({
                bartexId: polygonbartexAmount - i,
                tokenId: String(bartex.tokenId),
                name: String(metadata.name) || 'N/A',
                image: String(metadata.image),
                contractAddress: bartex.contractAddress,
                tokenUri: tokenUri,
                chainId: ENetwork.POLYGON,
              });
            }
          },
          polygonbartexAmount < 6 ? polygonbartexAmount : 6
        )
      );
    }

    return {
      props: { nfts },
    };
  } catch (e) {
    return {
      props: {
        nfts: [],
      },
    };
  }
};
