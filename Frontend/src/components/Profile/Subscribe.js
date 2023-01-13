import React, { useState } from "react";

import "./Subscribe.css"
import { useSigner, useAccount } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";


function Subscribe() {
      const { data: signer, isError, isLoading } = useSigner();
      const {address}=useAccount();
async function Subscribe(){
await PushAPI.channels.subscribe({
  signer: signer,
  channelAddress: "eip155:80001:0x9147BDf9aaca01B5f2680633e254a9776ecB10e5", // channel address in CAIP
  userAddress: `eip155:80001:${address}` , // user address in CAIP
  onSuccess: () => {
    console.log("opt in success");
  },
  onError: () => {
    console.error("opt in error");
  },
  env: "staging",
});
}


  return (
    <div>
      <button className="subscribe" onClick={Subscribe}>Subscribe</button>
    </div>
  );
}

export default Subscribe
