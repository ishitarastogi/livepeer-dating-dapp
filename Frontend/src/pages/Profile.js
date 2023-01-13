import React from "react";
import { DEFAULT_PROFILE } from "../api/profile/get-default";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import CreateProfile from "../components/Profile/CreateProfile"
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
        <CreateProfile currentUser={currentUser} />
      </div>
    );
}

export default Check;
