import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.media.desktop};
  margin: 50px auto;
  padding: 30px;
  min-height: 500px;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    flex-direction: column;
  }
`;

export const Info = styled.div`
  width: 50%;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    width: 100%;
    margin-top: 30px;
  }
`;
