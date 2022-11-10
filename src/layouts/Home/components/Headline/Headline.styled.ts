import styled from '@emotion/styled';

export const StyledHeadline = styled.div`
  position: relative;
  width: 100%;

  #tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.media.desktop};
  margin: 0 auto;
  padding: 60px 30px;
  min-height: 700px;
`;

export const Info = styled.div`
  width: 50%;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    width: 100%;
  }
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 10%,
      rgba(100, 126, 203, 0.5) 70%,
      rgba(208, 20, 152, 0.2) 100%
    );
    z-index: 1;
  }
`;
