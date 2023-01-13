import React, { useState } from "react";

import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { omit, splitSignature } from "../../lib/apollo/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_FOLLOW_TYPED_DATA } from "../../api/follow/follow";
import LENS_ABI from "../../abis/Lens-Hub.json";
import { LENS_HUB_PROXY_ADDRESS } from "../../config";

function Follow({ currentUser }) {
  console.log(currentUser)
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { write } = useContractWrite({
    address: LENS_HUB_PROXY_ADDRESS,
    abi: LENS_ABI,
    functionName: "followWithSig",
  });
  const [createFollowTypedData, {}] = useMutation(CREATE_FOLLOW_TYPED_DATA, {
    onCompleted({ createFollowTypedData }) {
      if (!createFollowTypedData) console.log("createFollow is null");

      const { typedData } = createFollowTypedData;
      const { profileIds, datas } = typedData?.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);
        const postARGS = {
          follower: address,
          profileIds,
          datas,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };

        write({ recklesslySetUnpreparedArgs: [postARGS] });
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleFollow = async () => {
    createFollowTypedData({
      variables: {
        request: {
          follow: { profile: currentUser},
        },
      },
    });
  };

  return (
    <div>
      <button onClick={() => handleFollow()}>Smash</button>
    </div>
  );
}

export default Follow;
