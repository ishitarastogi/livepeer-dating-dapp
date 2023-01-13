import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygonMumbai,
  polygon,
  optimism,
  arbitrum,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "../src/lib/apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
const { chains, provider } = configureChains(
  [mainnet, polygonMumbai, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "yfupUBsuP-veah6-aNiz_PnhNIksC29D" }),
    publicProvider(),
  ]
);
const client = createReactClient({
  provider: studioProvider({ apiKey: "442e85da-c261-4401-bcd0-7493fb3f4963" }),
});

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient()}>
      <WagmiConfig client={wagmiClient}>
        <LivepeerConfig client={client}>
          <RainbowKitProvider chains={chains}>
            <BrowserRouter>
              <App />
            </BrowserRouter>{" "}
          </RainbowKitProvider>
        </LivepeerConfig>
      </WagmiConfig>{" "}
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
