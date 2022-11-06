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
  min-height: 500px;
`;

export const Info = styled.div`
  width: 50%;
  z-index: 2;
`;

export const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;
