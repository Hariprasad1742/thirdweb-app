import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import "./index.css";

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "YOUR_CLIENT_ID",
});

// Define Sepolia chain
const chain = defineChain(11155111);

// Connect to your contract
export const contract = getContract({
  client,
  chain,
  address: "0x063136a5781F4c690EE0ec81a16Bc11f81644c26",
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);