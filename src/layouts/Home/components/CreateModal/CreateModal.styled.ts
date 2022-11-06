import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px 80px;
  text-align: center;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.colors.grayDark};
  box-shadow: rgb(10 10 10 / 80%) 0px 4px 20px 0px;
`;

export const NftsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0 50px;
`;
