import React, { useState, useEffect } from "react";
import { GET_PROFILE } from "../../api/profile/get-profile";

import { useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { EXPLORE_PUBLICATIONS } from "../../api/explore-publications";
import "./Explore.css";
import { useAccount } from "wagmi";
import { Player } from "@livepeer/react";

function Explore({currentUser}) {
  const[addr,setAddr]=useState("")
    const { address } = useAccount();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/yfupUBsuP-veah6-aNiz_PnhNIksC29D"
  );
useEffect(() => {
  async function fetchAddr() {
    let response = await provider.lookupAddress(address);
    setAddr(response);
  }

  fetchAddr();
}, [address]);
  
  const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        limit: 10,
        sources: ["slam"],
      },
    },
  });
    const { data1, loading1, error1 } = useQuery(GET_PROFILE, {
      variables: {
        request: { profileId: [currentUser?.id] },
      },
    });
    console.log(data1)
  if (loading && loading1) return <div>Loading...</div>;
  if (error && error1) return <div>Error!</div>;
  return (
    <div className="cards2">
      <div className="cards1">
      {data.explorePublications.items.map((data, index) => (
          <Card>
   
            <div key={index} className="main">
              <div className="header">
                <img
                  onClick={() => navigate(`/profile/${data.profile.handle}`)}
                  width="80px"
                  height="80px"
                  src={data.profile?.picture?.original?.url}
                ></img>
                <div>
                  <p>@{data.profile?.handle}</p>
                    <p>{addr}</p>
                  <p>{data.metadata?.content}</p>
                </div>
              </div>
              <img src={data?.profile?.coverPicture?.original?.url}></img>
              <div>
                <h2>{data.profile?.name}</h2>
                <p className="createdAt">{moment(data.createdAt).fromNow()}</p>
              </div>
            </div>
        
        <br />
        <h3>
          Penguins are living lessons in caring for the earth and its creatures,
          in all their beauty and vulnerability
        </h3>{" "}<br/>
        <Player
          className="v"
          title="Untitled (4).mp4"
          playbackId="971etz7kwbqfvdg8"
          objectFit="contain"
        />
      </div>
      <div className="cards1">
        <img
          src="https://gateway.pinata.cloud/ipfs/Qme5Bx3wBZe2E8eXb7ysB2VoSVNMDGdDHgnYDz4GkzRg2w"
          style={{ padding: "10px" }}
          height="200px"
          width="150px"
        />
      </div>
    </div>
  );
}

export default Explore;
