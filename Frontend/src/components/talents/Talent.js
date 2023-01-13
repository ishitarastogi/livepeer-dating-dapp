import React, { useState,useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST_TYPED_DATA } from "../../api/post/create-post";
import { omit, splitSignature } from "../../lib/apollo/helpers";
import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { LENS_HUB_PROXY_ADDRESS } from "../../config";
import LENS_ABI from "../../abis/Lens-Hub.json";
import { Ipfs } from "../../lib/ipfs";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { useCreateAsset } from "@livepeer/react";

import "./Talent.css"
function Talent(currentUser) {

  console.log(currentUser.currentUser.id);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isPosting, setIsPosting] = useState(false);
const[riddle,setRiddle] = useState([])
const[playbackUrl, setPlaybackUrl] = useState("")
  const [video, setVideo] = useState("");
  const [mediaMimeType, setMediaMimeType] = useState("");
const[url,setUrl] = useState("")
const {
  mutate: createAsset,
  data: assets,
  status,
  progress,
  error,
} = useCreateAsset(
  // we use a `const` assertion here to provide better Typescript types
  // for the returned data
  video
    ? {
        sources: [{ name: video.name, file: video }],
      }
    : null
);
useEffect(() => {
  {
    assets?.map((asset) => (
      <div key={asset.id}>
        <div>
          <div>{setPlaybackUrl(asset?.downloadUrl)}</div>
        </div>
      </div>
    ));
  }
}, [video]);
const options = {
  method: "GET",
  url: "https://riddles-by-api-ninjas.p.rapidapi.com/v1/riddles",
  params: { limit: "1" },
  headers: {
    "X-RapidAPI-Key": "e1334bea73msh0214085a122030cp1dcf6bjsn56d1b8b1d32f",
    "X-RapidAPI-Host": "riddles-by-api-ninjas.p.rapidapi.com",
  },
};
function handleRiddle(){
    axios
      .request(options)
      .then(function (response) {
        setRiddle(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
}

  const { signTypedDataAsync } = useSignTypedData();

  const { write } = useContractWrite({
    address: LENS_HUB_PROXY_ADDRESS,
    abi: LENS_ABI,
    functionName: "postWithSig",
  });
  const [createPostTypedData, {}] = useMutation(CREATE_POST_TYPED_DATA, {
    onCompleted({ createPostTypedData }) {
      if (!createPostTypedData) console.log("createPost is null");
      const { typedData } = createPostTypedData;
      const {
        profileId,
        contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
      } = typedData?.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);
        const postARGS = {
          profileId,
          contentURI,
          collectModule,
          collectModuleInitData,
          referenceModule,
          referenceModuleInitData,
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
      setIsPosting(false);
    },
  });
  const handlePost = async () => {
    if (!currentUser) return;
    setIsPosting(true);

    const data = {
      version: "1.0.0",
      metadata_id: uuidv4(),
      content,
      locale: "en-US",
      tags: ["nft1"],
      mainContentFocus: "TEXT_ONLY",
      name,
  
      attributes: [
       
      ],
      media: [
        {
          item: playbackUrl,
          type: "video/mp4",
        },
      ],
      appId: "datinglivepeer",
    };
    console.log(data);
    const result = await Ipfs({ data });
    console.log(result);
    console.log(`https://${result}.ipfs.w3s.link/data.json`);

    createPostTypedData({
      variables: {
        request: {
          profileId: currentUser.currentUser?.id,
          contentURI: `https://${result}.ipfs.w3s.link/data.json`,
          collectModule: {
            revertCollectModule: true,
          },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    });
  };
  if (isPosting) {
    return <div>Posting...</div>;
  }
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
          </li>
          <li>
            <p style={{ margin: "10px" }}>
              <ConnectButton />
            </p>
          </li>
        </ul>
      </nav>
      <div class="card">
        <div class="card-image">
          <h2 class="card-heading">
            Get started
            <br />
            <small>Let us create your account</small>
          </h2>
        </div>
        <br />
        <br />
        <div
          style={{
            margin: "0px",
            padding: "5px",
            border: "1px solid #8597a3",
            borderRadius: "5px",
          }}
          class="asset"
        >
          <br />
          <label
            style={{ color: "9b1969", fontWeight: "bold" }}
            className="asset-label"
          >
            Upload a talent video
          </label>
          <br />

          <input
            type="file"
            multiple={false}
            accept="video/*"
            onChange={(e) => {
              if (e.target.files) {
                setVideo(e.target.files[0]);
              }
            }}
          />

          <button
            disabled={status === "loading" || !createAsset}
            onClick={() => {
              createAsset?.();
            }}
          >
            Create Asset
          </button>
          {console.log(assets)}
        </div>
        <form onSubmit={handlePost}>
          {" "}
          <br />
          <div class="input">
            <input
              class="input-field"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Talent"
            ></input>{" "}
            <label class="input-label">What's your Talent?</label>
          </div>
          <br />
          <div class="input">
            <input
              class="input-field"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="enter video or html file"
            ></input>
            <label class="input-label">Enter url</label>
          </div>
          <div>
            {" "}
            <br />
            <button className="sub">Submit</button>
          </div>
        </form>
        <br />
        <br />
        <button onClick={handleRiddle}>
          Get riddle to keep conversation going
        </button>
        <div class="card-temp">
          {riddle &&
            riddle.map((link) => (
              <ul style={{ listStyle: "none" }}>
                <li>
                  <p> Title:{link?.title}</p>
                </li>
                <li>
                  <h2>Question:{link?.question}</h2>
                </li>
                <li>
                  <h2>Answer:{link?.answer}</h2>
                </li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Talent;
