

import React from "react";
import { DEFAULT_PROFILE } from "../api/profile/get-default";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";


function Check() {
  const { address } = useAccount();
  const { data: profileData } = useQuery(DEFAULT_PROFILE, {
    variables: {
      request: { ethereumAddress: address },
    },
  });
console.log(profileData?.defaultProfile?.id);
//   // if (!profileData) return null;
//   const currentUser = profileData?.profiles?.items[0];
//   // console.log(currentUser);
//   if (!currentUser) return null;
//   return (
//     <div>
//       {" "}
//       <Talent currentUser={currentUser} />
//     </div>
//   );
}

export default Check;
