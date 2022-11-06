import { Global, Theme, css } from '@emotion/react';

type TGlobalCommonStyles = {
  theme: Theme;
};

export const GlobalCommonStyles = ({ theme }: TGlobalCommonStyles) => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        font-family: 'Satoshi-Regular', Arial, 'sans-serif';
        font-size: 16px;
        color: ${theme.colors.primary};
        background: linear-gradient(
          ${theme.colors.grayDark} 0%,
          ${theme.colors.black} 100%
        );
      }

      input {
        font-family: 'Satoshi-Regular', Arial, 'sans-serif';
      }

      a {
        transition: color ease-out 0.3s;

        &:hover {
          color: ${theme.colors.secondary};
        }
      }

      .web3modal-modal-card {
        display: block !important;
        max-width: 500px !important;
      }

      #nprogress {
        .bar {
          position: absolute;
          top: 0;
        }

        .peg,
        .spinner {
          display: none;
        }
      }
    `}
  />
);
