import { useCallback, useState } from 'react';
import { AbiItem } from 'web3-utils';

import { Button, Img, Modal, Typography } from 'components';
import { useAuth } from 'hooks';
import NFTBartexAbi from 'contracts/NFT-bartex.json';
import { TNft } from '@types';
import { getContractAddressByChainId } from 'utils';

import { ImageWrapper, NftsItem } from '../../Home.styled';

import { Footer, NftsWrapper, Wrapper } from './CreateModal.styled';

type TNftSelectModal = {
  isOpen: boolean;
  onClose: () => void;
  userNfts: Array<TNft>;
  onSuccess: () => void;
};

export const CreateModal = ({
  isOpen,
  onClose,
  userNfts,
  onSuccess,
}: TNftSelectModal) => {
  const { account, web3, chainId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const handleConfirmClick = useCallback(async () => {
    setIsLoading(true);

    const contract = new web3.eth.Contract(
      NFTBartexAbi as AbiItem | AbiItem[],
      getContractAddressByChainId(chainId),
      {
        from: account,
      }
    );

    await contract.methods
      .createBartex(selectedNft.contractAddress, Number(selectedNft.tokenId))
      .send();

    onSuccess();
    setIsLoading(false);
    onClose();
  }, [account, chainId, onClose, onSuccess, selectedNft, web3]);

  return (
    <>
      <Modal {...{ isOpen, onClose }} maxWidth="1280px">
        <Wrapper>
          <Typography variant="h2">Select NFT for the bartex</Typography>
          <NftsWrapper>
            {userNfts.map(
              (nft, index) =>
                nft.image && (
                  <NftsItem
                    key={index}
                    onClick={() => setSelectedNft(nft)}
                    selected={selectedNft === nft}
                  >
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
          </NftsWrapper>
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
        </Wrapper>
      </Modal>
    </>
  );
};
