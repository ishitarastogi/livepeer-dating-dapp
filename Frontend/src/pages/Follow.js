import React from "react";
import Smash from "../components/smash/Smash";

import { DEFAULT_PROFILE } from "../api/profile/get-default";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
function Follows() {
  const { address } = useAccount();
  const { data: profileData } = useQuery(DEFAULT_PROFILE, {
    variables: {
      request: { ethereumAddress: address },
    },
  });
  // if (!profileData) return null;
  const currentUser = profileData?.defaultProfile?.id;
  console.log(currentUser);
  return (
    <div>
      {" "}
      <Smash currentUser={currentUser} />{" "}
    </div>
  );
}

export default Follows;
