import { TokenInfo, TokenList } from "@uniswap/token-lists";

export const validateTokenList = (tokenList: TokenList): boolean => {
  const { tokens } = tokenList;

  const tokensValid = tokens
    .map((token) => validateToken(token))
    .every((validity) => validity == true);

  return tokensValid;
};

const validateToken = (token: TokenInfo): boolean => {
  let result = true;

  if (!token.address) {
    console.log('Validation: missing token address');
    result = false;
  }
  if (!token.chainId) {
    console.log(token.address + ' missing chainId');
    result = false;
  }
  if (!token.name) {
    console.log(token.address + ' missing name');
    result = false;
  }
  if (!token.symbol) {
    console.log(token.address + ' missing symbol');
    result = false;
  }
  if (token.decimals === null) {
    console.log(token.address + ' missing decimals');
    result = false;
  }
  // Enforce that we have a logo for each token
  if (!token.logoURI) {
    console.log(token.address + ' missing logo');
    result = false;
  }

  // "(PoS)" is included in the names of tokens which are bridged to Polygon
  // We want to ensure that we strip these out.
  if (token.name.includes("(PoS)")) return false;

  return result;
};
