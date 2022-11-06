import { useToggle } from 'react-use';
import Link from 'next/link';
// eslint-disable-next-line import/no-named-as-default
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
SwiperCore.use([Autoplay, EffectFade]);

import { Button, Img, Typography } from 'components';

import { CreateModal } from '../CreateModal';

import { Background, Info, StyledHeadline, Wrapper } from './Headline.styled';
import { HeadlineProps } from './types';
import { particlesOptions } from './Particles';

export const Headline = ({ userNfts, nfts }: HeadlineProps) => {
  const [isCreateModalOpen, setCreateModalOpen] = useToggle(false);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <StyledHeadline>
      <Background src="./background.jpg" />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions as any}
      />
      <Wrapper>
        <Info>
          <Typography variant="h1" typographyStyle={{ marginTop: 50 }}>
            Welcome to NFT BARTEX
          </Typography>
          <Typography variant="text" typographyStyle={{ marginTop: 20 }}>
            Here you can exchange any of yours NFT to the NFT in community
            connection. Feel free to explore and get new items for your
            collection.
          </Typography>
          <Button
            buttonStyle={{ marginTop: 20 }}
            onClick={() => setCreateModalOpen(true)}
          >
            Create
          </Button>
        </Info>
        {nfts.length > 3 && (
          <Swiper
            effect={'fade'}
            allowTouchMove={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop
            style={{ height: 428, width: '40%' }}
          >
            {nfts.map(nft => (
              <SwiperSlide
                key={nft.bartexId}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link href={`nft/${nft.bartexId}`} key={nft.bartexId}>
                  <Img
                    src={nft.image}
                    imageStyle={{ borderRadius: 5, cursor: 'pointer' }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* TODO: Add swiper here */}
      </Wrapper>

      <CreateModal
        isOpen={isCreateModalOpen}
        userNfts={userNfts}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={() => null}
      />
    </StyledHeadline>
  );
};
