import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Moralis from 'moralis';

import { useAuth, useItems } from 'hooks';
import { getMoralisNetworkByChainId } from 'utils';
import { TBartex, TNft } from '@types';

import { StyledHome } from './Home.styled';
import { FreshDrops, Headline, Info } from './components';

type HomeProps = {
  nfts: TBartex[];
};

export const Home = ({ nfts }: HomeProps) => {
  const { account, chainId } = useAuth();
  const [userNfts, { addToEnd: addUserNftsToEnd }] = useItems<TNft>([]);

  const getUserNfts = useCallback(async () => {
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
          if (
            nft.metadata &&
            Object.keys(nft.metadata).length > 0 &&
            nft.contractType === 'ERC721'
          ) {
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
    }
  }, [account, addUserNftsToEnd, chainId]);

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
        <FreshDrops nfts={nfts} />
        <Info />
      </StyledHome>
    </>
  );
};
