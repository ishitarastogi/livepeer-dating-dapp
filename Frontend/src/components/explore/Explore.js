import React, { useState, useEffect } from "react";
import { DEFAULT_PROFILE } from "../../api/profile/get-default";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Embed from "../Profile/Embed";

import { useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { EXPLORE_PUBLICATIONS } from "../../api/explore-publications";
import "./Explore.css";
import { useAccount } from "wagmi";
import { Player } from "@livepeer/react";
import Follow from "../../pages/Follow"
import PushChat from "../chat/Chat"

async function Explore({currentUser}) {
  const[addr,setAddr]=useState("")
    const { address } = useAccount();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/yfupUBsuP-veah6-aNiz_PnhNIksC29D"
  );

async function handleEns(){
    const response = await provider.lookupAddress(
      address
    );
    setAddr(response)
    console.log(response);
}





  const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS, {
    variables: {
      request: {
        sortCriteria: "LATEST",
        publicationTypes: ["POST"],
        limit: 10,
        sources: ["datinglivepeer"],
      },
    },
  });
  const { data: profileData } = useQuery(DEFAULT_PROFILE, {
    variables: {
      request: { ethereumAddress: address },
    },
  });
    console.log("data",data);
        console.log("data1", profileData);

  if (loading) return <div>Loading...</div>;
  if (error ) return <div>Error!</div>;
  return (
    <div>
      <nav class="nav-container">
        {/* <h3 class="title">BLOOM</h3> */}
        <ul class="nav-items">
          {" "}
          <li style={{ display: "flex", margin: "10px", padding: "15px" }}>
            <p href="#">
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </p>
            <p href="#">
              <Link to="/next" style={{ color: "white" }}>
                Tell more
              </Link>
            </p>
            <p>
              <p>
                <Embed />
              </p>
            </p>
          </li>
          <li>
            <p style={{ margin: "10px" }}>
              <ConnectButton />
            </p>
          </li>
        </ul>
      </nav>
      <h2 className="textm">Let's find a perfect match for you 🧚</h2>
      <div className="n">
        <div class="slider">
          <div class="slides">
            <div id="slide-1">
              <img
                src={profileData.defaultProfile.picture.original.url}
                width="400px"
                height="300px"
              />
              <br />
              <p
                style={{
                  color: "#7c2f6f",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                If you were looking for a sign 🎵, here it is ⏫.
              </p>
            </div>
            <div id="slide-2">
              {" "}
              <br />
              <Player
                className="v"
                title="Untitled (4).mp4"
                playbackId={profileData.defaultProfile.attributes[1].value}
                objectFit="contain"
              />
              <p style={{ color: "#7c2f6f", fontWeight: "bold" }}>
                Tell your story with video as it is the art of weaving together
                the sights, sounds, and emotions.
              </p>
            </div>
            <div
              id="slide-3"
              style={{
                background:
                  "linear-gradient(to right, #ffb95a, #b321de, #aa2d95)",
              }}
            >
              {" "}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h2 style={{ color: "pink" }}>
                Name:{profileData.defaultProfile.name}
              </h2>
             
              <h3 style={{ color: "white" }}>
                Bio:{profileData.defaultProfile.bio}
              </h3>
              <br />
              <h3 style={{ color: "#ffb95a" }}>
                Favourite NFT:{profileData.defaultProfile.attributes[0].value}
                🐰
              </h3>
              <br />
              <div
                style={{
                  border: "2px solid #ffb95a",
                  borderRadius: "20px",
                  width: "50%",
                  margin: "auto",
                  padding: "5px",
                  color: "white",
                }}
              >
                <p onClick={handleEns}>Ens{addr}</p>
                <p>
                  Memorable Moment:
                  {profileData.defaultProfile.attributes[3].value}
                </p>
                <p>
                  Memorable Moment Date:
                  {profileData.defaultProfile.attributes[4].value}
                </p>
              </div>
            </div>
            <div id="slide-4">
              {" "}
              <img
                src={profileData.defaultProfile.attributes[2].value}
                width="470px"
                height="260px"
              />
              <br />
              <p>My favorite meme</p>
              <p>lol❗xd❗lmao❗rofl❗😂😂😂</p>
            </div>
            <div id="slide-5">
              {" "}
              <Player
                className="v"
                title="Untitled (4).mp4"
                playbackId={profileData.defaultProfile.attributes[1].value}
                objectFit="contain"
              />{" "}<br/>
              <div>
                <button>Mint an NFT</button>
              </div>
            </div>
          </div>
          <Follow />
        </div>
      </div>
      <PushChat />
    </div>
  );
}

export default Explore;
