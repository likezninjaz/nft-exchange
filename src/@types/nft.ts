export type TNft = {
  tokenId: string;
  name: string;
  image: string;
  contractAddress: string;
  tokenUri: string;
};

export type TBartex = TNft & {
  bartexId: number;
  chainId: number;
};

export type TBartexDetail = TBartex & {
  description: string;
};
