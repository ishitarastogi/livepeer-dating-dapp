import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROFILE_METADATA } from "../../api/profile/set-metadata";
import axios from "axios";

import "./Profile.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LENS_PERIPHERY_CONTRACT } from "../../config";
import LENS_ABI from "../../abis/Lens-Periphery.json";
import { Ipfs } from "../../lib/ipfs";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { omit, splitSignature } from "../../lib/apollo/helpers";
import { useSignTypedData, useContractWrite } from "wagmi";
import DatePicker from "react-date-picker";
import { useCreateAsset } from "@livepeer/react";

function CreateProfile({ currentUser }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [value, onChange] = useState(new Date());
  const [playbackId, setPlaybackId] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const[pic,setPic] = useState("");
  const [nft, setNft] = useState("");
  const [meme, setMeme] = useState("");
  const [video, setVideo] = useState("");
  const [talents, setTalents] = useState("");
  const [moment, setMoment] = useState("");
  const [date, setDate] = useState(null);
    const options = {
      method: "GET",
      url: "https://api.nftport.xyz/v0/search",
      params: {
        text: text,
        chain: "all",
        page_number: "1",
        page_size: "50",
        order_by: "relevance",
        sort_order: "desc",
      },
      headers: {
        accept: "application/json",
        Authorization: "9c626e7f-cd93-43c5-9e65-17f9faaa2db4",
      },
    }; 
     function handleClick(e) {
       e.preventDefault();
      axios
        .request(options)
        .then(function (response) {
          setData(response.data.search_results);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    const onOptionChangeHandler = (event) => {
      setNft(event.target.value);
    };

  function chooseDate(e) {
e.preventDefault();
    const date = value,
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    setDate([date.getFullYear(), mnth, day].join("-"));
  }

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

  {console.log(playbackId)}
 const { signTypedDataAsync } = useSignTypedData();

 const { write } = useContractWrite({
   address: LENS_PERIPHERY_CONTRACT,
   abi: LENS_ABI,
   functionName: "setProfileMetadataURIWithSig",
 });
 const [createSetProfileMetadataTypedData, {}] = useMutation(
   CREATE_PROFILE_METADATA,
   {
     onCompleted({ createSetProfileMetadataTypedData }) {
       if (!createSetProfileMetadataTypedData)
         console.log("createPost is null");
       console.log("aaa", createSetProfileMetadataTypedData.typedData);

       const { typedData } = createSetProfileMetadataTypedData;
       const { profileId, metadata } = typedData?.value;
       signTypedDataAsync({
         domain: omit(typedData?.domain, "__typename"),
         types: omit(typedData?.types, "__typename"),
         value: omit(typedData?.value, "__typename"),
       }).then((res) => {
         console.log("testttt");
         const { v, r, s } = splitSignature(res);
         const postARGS = {
           profileId,
           metadata,
           sig: {
             v,
             r,
             s,
             deadline: typedData.value.deadline,
           },
         };
         write({ recklesslySetUnpreparedArgs: [postARGS] });
         //   .then((res) => {
         //     res.wait(1).then(() => {});
         //   });
       });
     },
     onError(error) {
       console.log(error);
     },
   }
 );
    const handleClicks = async (e) => {
       e.preventDefault();
       assets?.map((asset) => (
         <div key={asset.id}>
           <div>
             <div>{setPlaybackId(asset?.playbackId)}</div>
           </div>
         </div>
       ));
    }
  //  const handleCreateProfiles = async (e) => {
           
              
  //                    e.preventDefault();

             
  //       const data={
  //         name,
             
  //   playbackId
  
  //       }
  //           console.log(data);
  //           const result = await Ipfs({ data });
  //           console.log(result);
  //           console.log(`https://${result}.ipfs.w3s.link/data.json`);
            

  //  }

  const handleCreateProfile = async (e) => {
        e.preventDefault();

    // setIsPosting(true);

    const data = {
      version: "1.0.0",
      metadata_id: uuidv4(),
      name,
      bio,
      cover_picture:pic,

      attributes: [
        {
          displayType: null,
          traitType: "string",
          key: "location",
          value: location,
        },
        {
          traitType: "string",
          value: nft,
          displayType: null,
          key: "favorite NFT character",
        },
        {
          traitType: "string",
          value: playbackId,
          displayType: null,
          key: "short video intro",
        },
        {
          traitType: "string",
          value: meme,
          displayType: null,
          key: "Meme",
        },

        {
          traitType: "string",
          value: moment,
          displayType: null,
          key: "Memorable moment",
        },
        {
          traitType: "string",
          value: date,
          displayType: null,
          key: "Memorable moment date",
        },
      ],
    };
    console.log(data);
    const result = await Ipfs({ data });
    console.log(result);
    console.log(`https://${result}.ipfs.w3s.link/data.json`);

    await createSetProfileMetadataTypedData({
      variables: {
        request: {
          profileId: currentUser,
          metadata: "https://" + result + ".ipfs.w3s.link/data.json",
        },
      },
    });
  };
  return (
    <div class="container">
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
        <div
          style={{
            margin: "0px",
            padding: "5px",
            border: "1px solid #8597a3",
            borderRadius: "5px",
          }}
          class="asset"
        >
          <label className="asset-label">Upload a short story of yours</label>
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
          {console.log(progress)}
        </div>
        <form
          onSubmit={(e) => {
            handleCreateProfile(e);
          }}
        >
          <div class="input">
            <input
              type="text"
              class="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label class="input-label">Full name</label>
          </div>{" "}
          {/* <div class="input">
            <input
              type="text"
              class="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <label class="input-label">Text</label>
          </div>{" "}
          <button onClick={handleClicks}>click</button> */}
          {/* <div class="action">
            <button  class="action-button">Create Profile</button>
          </div> */}
          
          <div class="input">
            <input
              type="text"
              class="input-field"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <label class="input-label">Bio</label>
          </div>
          <div class="input">
            <input
              type="text"
              class="input-field"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
            />
            <label class="input-label">Enter pic url</label>
          </div>
          <div class="input">
            <input
              type="text"
              class="input-field"
              value={meme}
              onChange={(e) => setMeme(e.target.value)}
            />
            <label class="input-label">Meme</label>
          </div>{" "}
          <br />
          <div
            style={{
              margin: "0px",
              padding: "5px",
              border: "1px solid #8597a3",
              borderRadius: "5px",
            }}
            class="inputs"
          >
            <label className="asset-label">Choose your favorite NFT</label>

            <input
              type="text"
              value={text}
              placeholder="Enter NFT name"
              onChange={(e) => setText(e.target.value)}
            />
            {nft && console.log(nft)}

            <button className="btn2" onClick={handleClick}>
              Confirm
            </button>
            <br />
            <select style={{ width: "200px" }} onChange={onOptionChangeHandler}>
              <option>Please choose one option</option>
              {data.map((option, index) => {
                return <option key={index}>{option?.name}</option>;
              })}
            </select>
          </div>
          <br />{" "}
          <div
            style={{
              margin: "0px",
              padding: "5px",
              border: "1px solid #8597a3",
              borderRadius: "5px",
            }}
          >
            <div class="input">
              <input
                type="text"
                class="input-field"
                value={moment}
                onChange={(e) => setMoment(e.target.value)}
              />
              <label class="input-label">Enter memorable moment</label>
            </div>
            <label className="asset-label">
              <hr style={{ color: "#8597a3" }} />
              <br /> Choose memorable date
            </label>{" "}
            <br />
            <DatePicker onChange={onChange} value={value} />
            <br /> <br />
            <br />
            <button onClick={chooseDate}>confirm date</button>
            <br />
            <br />
          </div>
        {" "}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
