import { useCallback, useState } from 'react';
import { AbiItem } from 'web3-utils';

import { Button, Img, Modal, Typography } from 'components';
import { useAuth } from 'hooks';
import { TNft } from '@types';
import NFTBartexAbi from 'contracts/NFT-bartex.json';

import { ImageWrapper, NftsItem } from '../../Home.styled';

import { Footer, Wrapper } from './NftSelectModal.styled';

type TNftSelectModal = {
  isOpen: boolean;
  onClose: () => void;
  selectedBartexId: number;
  userNfts: Array<TNft>;
};

export const NftSelectModal = ({
  isOpen,
  onClose,
  selectedBartexId,
  userNfts,
}: TNftSelectModal) => {
  const { account, web3 } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);

  const handleConfirmClick = useCallback(async () => {
    setIsLoading(true);

    const contract = new web3.eth.Contract(
      NFTBartexAbi as AbiItem | AbiItem[],
      process.env.NEXT_PUBLIC_BARTEX_CONTRACT_ADDRESS,
      {
        from: account,
      }
    );

    await contract.methods
      .createOffer(
        selectedBartexId,
        selectedNft.contractAddress,
        Number(selectedNft.tokenId)
      )
      .send();

    setIsLoading(false);
    onClose();
  }, [account, onClose, selectedBartexId, selectedNft, web3]);

  return (
    <>
      <Modal {...{ isOpen, onClose }} maxWidth="900px">
        <Wrapper>
          <Typography variant="h2">Select NFT for the exchange</Typography>
          <>
            {userNfts.map(
              (nft, index) =>
                nft.image && (
                  <NftsItem key={index} onClick={() => setSelectedNft(nft)}>
                    <ImageWrapper>
                      <Img hasPlaceholder src={nft.image} />
                    </ImageWrapper>
                    <Typography
                      typographyStyle={{
                        margin: 12,
                        textAlign: 'left',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {nft.name}
                    </Typography>
                  </NftsItem>
                )
            )}
          </>
          {selectedNft && (
            <Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmClick}
                isLoading={isLoading}
                buttonStyle={{ marginLeft: 20 }}
              >
                Exchange
              </Button>
            </Footer>
          )}
        </Wrapper>
      </Modal>
    </>
  );
};
