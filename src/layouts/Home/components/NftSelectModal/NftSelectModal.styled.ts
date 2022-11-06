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
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 2px rgb(34 36 38 / 12%);
`;
