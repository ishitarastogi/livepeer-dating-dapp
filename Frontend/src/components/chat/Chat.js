import React from "react";
import { Chat } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";
function Pushchat() {
  const { address } = useAccount();
  console.log(address);
  return (
    <div>
      <Chat
        account="0x921039254228ecC345084221f927FD0FCD4aD4b7" //user address
        supportAddress="0x4dc8b342dAe79b0426a05c4fb9d95eD1f9b97144" //support address
        apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
        env="staging"
      />
    </div>
  );
}

export default Pushchat;
