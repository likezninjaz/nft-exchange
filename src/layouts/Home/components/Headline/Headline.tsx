import { useToggle } from 'react-use';
import Link from 'next/link';
// eslint-disable-next-line import/no-named-as-default
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
SwiperCore.use([Autoplay, EffectCoverflow]);

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
      <Background>
        {nfts.length > 0 && (
          <Swiper
            speed={1000}
            allowTouchMove={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            style={{ height: '100%', width: '100%', margin: 0 }}
          >
            {nfts.map(nft => (
              <SwiperSlide
                key={nft.bartexId}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link
                  href={`nft/${nft.bartexId}?chainId=${nft.chainId}`}
                  key={nft.bartexId}
                >
                  <Img
                    src={nft.image}
                    imageStyle={{ borderRadius: 5, cursor: 'pointer' }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Background>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions as any}
      />
      <Wrapper>
        <Info>
          <Typography
            variant="h1"
            typographyStyle={{ marginTop: 50, fontSize: 80, lineHeight: 1.1 }}
          >
            Welcome
            <br/>
            to NFT Bartex
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
