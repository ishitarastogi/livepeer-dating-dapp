import { gql } from "@apollo/client";

import { ProfileFragmentFull } from "../fragments/ProfileFragmentFull";
export const SEARCH_PROFILES = gql`
  query Search ($request: SearchQueryRequest!) {
    search(request: $request) {
          ... on ProfileSearchResult {

      items {
          ...ProfileFragmentFull
      }
    }
    }
  }
  ${ProfileFragmentFull}
`;
