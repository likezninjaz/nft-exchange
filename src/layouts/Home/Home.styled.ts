import styled from '@emotion/styled';

import { Typography } from 'components';

export const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: auto;
  user-select: none;
`;

export const Description = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-family: 'Satoshi-Medium';
  cursor: default;
`;

export const Introducing = styled(Typography)`
  margin-top: 45px;
  color: ${({ theme }) => theme.colors.grayLight};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    margin-top: 21px;
  }
`;

export const NftsItem = styled.div<{ selected?: boolean }>`
  position: relative;
  margin: 10px;
  width: 350px;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.grayDark};
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 30%);
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    transition: opacity 0.3s ease;
    filter: blur(10px);
    opacity: ${({ selected }) => (selected ? 0.7 : 0)};
    transition: opacity 0.3s;
    border-radius: inherit;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100%;
    height: 400px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 350px;
  border-radius: 5px 5px 0 0;

  img {
    transition: all 0.3s ease;

    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.05);
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    height: 350px;
  }
`;
