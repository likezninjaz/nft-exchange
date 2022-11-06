import { useCallback, useEffect, useState } from 'react';
import { AbiItem } from 'web3-utils';
import { times } from 'ramda';
import Web3 from 'web3';
import Head from 'next/head';
import Moralis from 'moralis';

import { useAuth, useItems } from 'hooks';
import { getMoralisNetworkByChainId } from 'utils';
import NFTBartexAbi from 'contracts/NFT-bartex.json';
import ERC721Abi from 'contracts/ERC721.json';
import { TBartex, TNft } from '@types';

import { StyledHome } from './Home.styled';
import { FreshDrops, Headline } from './components';

export const Home = () => {
  const { account, chainId } = useAuth();
  const [nfts, { addToEnd, clear }] = useItems<TBartex>([]);
  const [userNfts, { addToEnd: addUserNftsToEnd }] = useItems<TNft>([]);
  const [loading, setLoading] = useState(true);

  const getNfts = useCallback(async () => {
    clear();
    setLoading(true);
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_NODE)
      );
      const contract = new web3.eth.Contract(
        NFTBartexAbi as AbiItem | AbiItem[],
        process.env.NEXT_PUBLIC_BARTEX_CONTRACT_ADDRESS,
        {
          from: account,
        }
      );

      const bartexAmount = await contract.methods.bartexIndex().call();

      if (bartexAmount > 0) {
        Promise.all(
          times(
            async i => {
              const bartex = await contract.methods.bartexes(i + 1).call();
              const nftContract = new web3.eth.Contract(
                ERC721Abi as AbiItem | AbiItem[],
                bartex.contractAddress,
                {
                  from: account,
                }
              );
              const tokenUri = await nftContract.methods
                .tokenURI(bartex.tokenId)
                .call();
              const metadataResponse = await fetch(tokenUri);
              const metadata = await metadataResponse.json();
              if (metadata && Object.keys(metadata).length > 0) {
                addToEnd({
                  bartexId: i + 1,
                  tokenId: String(bartex.tokenId),
                  name: String(metadata.name) || 'N/A',
                  image: String(metadata.image),
                  contractAddress: bartex.contractAddress,
                  tokenUri: tokenUri,
                });
              }
            },
            bartexAmount < 6 ? bartexAmount : 6
          )
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, addToEnd, clear]);

  const getUserNfts = useCallback(async () => {
    setLoading(true);
    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address: account,
        chain: getMoralisNetworkByChainId(chainId),
      });
      const ownedNfts = response.toJSON();

      if (ownedNfts.length > 0) {
        let newNFts = [];

        for (let i = 0; i < ownedNfts.length; i++) {
          const nft = ownedNfts[i];
          if (nft.metadata && Object.keys(nft.metadata).length > 0) {
            newNFts = newNFts.concat({
              tokenId: nft.tokenId,
              name: nft.metadata.name || 'N/A',
              image: nft.metadata.image,
              contractAddress: nft.tokenAddress,
              tokenUri: nft.tokenUri,
            });
          }
        }
        addUserNftsToEnd(newNFts);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, addUserNftsToEnd, chainId]);

  useEffect(() => {
    getNfts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account) getUserNfts();
  }, [account, getUserNfts]);

  return (
    <>
      <Head>
        <title>NFT Bartex - exchange your NFTs for free</title>
      </Head>
      <StyledHome>
        <Headline userNfts={userNfts} nfts={nfts} />
        <FreshDrops nfts={nfts} loading={loading} />
      </StyledHome>
    </>
  );
};
