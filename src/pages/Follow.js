import React from "react";
import Smash from "../components/smash/Smash";

import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
function Follows() {
  const { address } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [address] },
    },
  });
  if (!profileData) return null;

  const currentUser = profileData.profiles.items[0];
  console.log(profileData);

  console.log(currentUser?.id);
  return (
    <div>
      {" "}
      <Follow currentUser={currentUser} />{" "}
    </div>
  );
}

export default Follows;
