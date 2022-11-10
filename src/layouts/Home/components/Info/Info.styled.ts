import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px auto 150px;
  max-width: ${({ theme }) => theme.media.desktop};
  padding: 0 30px;
`;
