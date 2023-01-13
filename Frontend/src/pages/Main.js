import React from "react";
import { DEFAULT_PROFILE } from "../api/profile/get-default";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import Home from "../components/Home/Home";
function Check() {
  const { address } = useAccount();
  const { data: profileData } = useQuery(DEFAULT_PROFILE, {
    variables: {
      request: { ethereumAddress: address },
    },
  });
  // if (!profileData) return null;
  const currentUser = profileData?.defaultProfile?.id;
  console.log(currentUser);
  if (!currentUser) return null;
  return (
    <div>
      {" "}
      <Home currentUser={currentUser} />
    </div>
  );
}

export default Check;
