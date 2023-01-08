import React from "react";
import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
// import { Redirect } from "react-router-dom";
import Explore from "../components/explore/Explore";

function Display() {
  const { address } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [address] },
    },
  });

  if (!profileData) return null;
  const currentUser = profileData.profiles.items[0];
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
