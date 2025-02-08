import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { sendSOL, solana } from "@goat-sdk/wallet-solana";

import { Connection, Keypair } from "@solana/web3.js";
import { jupiter } from "@goat-sdk/plugin-jupiter";
import { splToken } from "@goat-sdk/plugin-spl-token";

import base58 from "bs58";

require("dotenv").config();

const connection = new Connection(process.env.RPC_PROVIDER_URL as string);
const keypair = Keypair.fromSecretKey(
  base58.decode(process.env.WALLET_PRIVATE_KEY as string)
);

(async () => {
  const tools = await getOnChainTools({
    wallet: solana({
      keypair,
      connection,
    }),
    plugins: [
      sendSOL(), // Enable SOL transfers
      jupiter(),
      splToken(),
    ],
  });

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    tools: tools,
    maxSteps: 5, // Maximum number of tool invocations per request
    // prompt: "Send 0.005 SOL to 8BgiiWipqoSf6zadDF8EcA3MDTCXFampjX7AJ46ZEFky",
    prompt:
      "Swap 0.001 USDC for JUP(JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN)",
  });

  console.log(result.text);
})();
