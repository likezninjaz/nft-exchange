import { ENetwork } from '@types';

export const getContractAddressByChainId = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return process.env.NEXT_PUBLIC_ETH_NFT_CONTRACT_ADDRESS;
    case ENetwork.BNB:
      return process.env.NEXT_PUBLIC_BNB_NFT_CONTRACT_ADDRESS;
    case ENetwork.POLYGON:
      return process.env.NEXT_PUBLIC_POLYGON_NFT_CONTRACT_ADDRESS;
  }
};
