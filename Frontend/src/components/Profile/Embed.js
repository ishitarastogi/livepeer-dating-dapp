import { EmbedSDK } from "@pushprotocol/uiembed";

import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import "./Subscribe.css";

function Embed() {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      // 'your connected wallet address'
      EmbedSDK.init({
        headerText: "Hello DeFi", // optional
        targetID: "sdk-trigger-id", // mandatory
        appName: "consumerApp", // mandatory
        user: address, // mandatory
        chainId: 80001, // mandatory
        viewOptions: {
          type: "sidebar", // optional [default: 'sidebar', 'modal']
          showUnreadIndicator: true, // optional
          unreadIndicatorColor: "#cc1919",
          unreadIndicatorPosition: "bottom-right",
        },
        theme: "light",
        onOpen: () => {
          console.log("-> client dApp onOpen callback");
        },
        onClose: () => {
          console.log("-> client dApp onClose callback");
        },
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);
  return (
    <div>
      <button className="notif" id="sdk-trigger-id">Notifs 🔔</button>
    </div>
  );
}

export default Embed;
