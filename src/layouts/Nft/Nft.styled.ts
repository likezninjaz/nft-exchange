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
`;

export const Info = styled.div`
  width: 50%;
  z-index: 2;
`;
