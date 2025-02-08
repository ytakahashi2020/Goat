# 1 create a connection

`import { Connection } from "@solana/web3.js";`
`const connection = new Connection(process.env.RPC_PROVIDER_URL as string);`

# 2 get a keypair

`import base58 from "bs58";`

```
const keypair = Keypair.fromSecretKey(
  base58.decode(process.env.WALLET_PRIVATE_KEY as string)
);
```

# 3 create an async function

`async function main() {}`

`main()`

# 4 create a tool

### 1 set an outline

`import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";`

`const tools = await getOnChainTools({ });`

### 2 set solana

`import { sendSOL, solana } from "@goat-sdk/wallet-solana";`

```
wallet: solana({
    keypair,
    connection,
}),
```

### 3 set plugin

`import { jupiter } from "@goat-sdk/plugin-jupiter";`

```
plugins: [
    jupiter(),
],
```

# 5 generate text

### 1 import

```
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
```

### 2 generateText

```
const result = await generateText({
    model: openai("gpt-4o-mini"),
    tools: tools,
    maxSteps: 5, // Maximum number of tool invocations per request
    // prompt: "Send 0.005 SOL to 8BgiiWipqoSf6zadDF8EcA3MDTCXFampjX7AJ46ZEFky",
    prompt:
      "Swap 0.001 USDC for JUP(JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN)",
  });
```
