import styled from '@emotion/styled';

export const StyledFooter = styled.footer`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 25px;
  margin: 0 auto;
  width: ${({ theme }) => theme.media.desktop};
  user-select: none;
  border-top: ${({ theme }) => `1px solid ${theme.colors.grayDark}`};

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

export const Copyright = styled.div`
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: 20px;
  }
`;
