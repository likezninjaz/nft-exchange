import Head from 'next/head';
import { useToggle } from 'react-use';
import { useCallback, useEffect } from 'react';
import Moralis from 'moralis';

import { useAuth, useItems } from 'hooks';
import { Button, Img, Typography } from 'components';
import { getMoralisNetworkByChainId } from 'utils';
import { TNft } from '@types';

import { Container, Info, Wrapper } from './Nft.styled';
import { NftProps } from './types';
import { NftSelectModal } from './components';

export const Nft = ({ bartex }: NftProps) => {
  const { account, chainId } = useAuth();
  const [userNfts, { addToEnd: addUserNftsToEnd }] = useItems<TNft>([]);
  const [isModalOpen, setModalOpen] = useToggle(false);

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
    }
  }, [account, addUserNftsToEnd, chainId]);

  useEffect(() => {
    if (account) getUserNfts();
  }, [account, getUserNfts]);

  return (
    <>
      <Head>
        <title>{bartex.name} - Bartex</title>
      </Head>
      <Container>
        <Wrapper>
          <Img
            // src={nfts[0]?.image}
            src={bartex.image}
            imageStyle={{
              width: 'calc(50% - 40px)',
              height: 500,
              objectFit: 'cover',
              zIndex: 2,
              borderRadius: 5,
            }}
          />
          <Info>
            <Typography variant="h1">{bartex.name}</Typography>
            <Typography typographyStyle={{ marginTop: 10 }}>
              {bartex.description}
            </Typography>
            <Typography typographyStyle={{ marginTop: 10 }}>
              Contract: {bartex.contractAddress}
            </Typography>
            <Button
              buttonStyle={{ marginTop: 20 }}
              onClick={() => setModalOpen(true)}
            >
              Offer
            </Button>
          </Info>
        </Wrapper>
      </Container>
      <NftSelectModal
        isOpen={isModalOpen}
        userNfts={userNfts}
        selectedBartexId={bartex.bartexId}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
