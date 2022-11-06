import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  user-select: none;
  box-shadow: rgb(10 10 10 / 80%) 0px 4px 20px 0px;
  background: ${({ theme }) => theme.colors.grayDark};
  z-index: 5;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  padding: 0 20px 0 10px;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.media.desktop};
`;

export const Logo = styled.img<{ isLink?: boolean }>`
  height: 50px;
  object-fit: cover;
  cursor: ${({ isLink }) => (isLink ? 'pointer' : 'default')};
`;

export const RightPane = styled.div`
  display: flex;
  align-items: center;
`;
