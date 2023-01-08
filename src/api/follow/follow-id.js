import { gql } from "@apollo/client/core";

export const FOLLOW_TOKEN_ID = gql`
  query ($request: FollowerNftOwnedTokenIdsRequest!) {
    followerNftOwnedTokenIds(request: $request) {
      followerNftAddress
      tokensIds
    }
  }
`;
