import Link from 'next/link';

import { Img, Loader, Typography } from 'components';
import { ImageWrapper, NftsItem } from 'layouts/Home/Home.styled';

import { NftsWrapper } from './FreshDrops.styled';
import { FreshDropsProps } from './types';

export const FreshDrops = ({ nfts, loading }: FreshDropsProps) => {
  if (nfts.length === 0 && loading) return <Loader />;

  return (
    nfts.length > 0 && (
      <>
        <Typography variant="h2" typographyStyle={{ marginTop: 100 }}>
          FRESH DROPS
        </Typography>
        <NftsWrapper>
          {nfts.map(nft => (
            <Link href={`nft/${nft.bartexId}`} key={nft.bartexId}>
              <NftsItem>
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
            </Link>
          ))}
        </NftsWrapper>
      </>
    )
  );
};
