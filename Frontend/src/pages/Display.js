import React from "react";
import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
// import { Redirect } from "react-router-dom";
import Explore from "../components/explore/Explore";

function Display() {
  const { address } = useAccount();
  const { data: profileData } = useQuery(DEFAULT_PROFILE, {
    variables: {
      request: { ethereumAddress: address },
    },
  });
  const currentUser = profileData?.defaultProfile?.id;
  console.log(currentUser);
  if (!currentUser) return null;
  return (
    <div>
      {" "}
      <Explore currentUser={currentUser} />
    </div>
  );
}

export default Display;
