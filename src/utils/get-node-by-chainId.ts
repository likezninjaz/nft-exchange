import { ENetwork } from '@types';

export const getNodeByChainId = (chainId: number): string => {
  switch (chainId) {
    case ENetwork.ETH:
      return 'https://data-seed-prebsc-1-s1.binance.org:8545';
    case ENetwork.BNB:
      return 'https://data-seed-prebsc-1-s1.binance.org:8545';
    case ENetwork.POLYGON:
      return 'https://rpc-mumbai.maticvigil.com';
  }
};
