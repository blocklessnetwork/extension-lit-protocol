import * as LitJsSdk from "@lit-protocol/lit-node-client";

const authSig = {
  sig: "0x2bb705d93dc064d1e5b5bc15f43c265db3ea8795802a2a7a72f51bc9a42ffa9c6121c6508244a74cd91c3e4a2882dd134381367fb74c801a799a2ce1fbaa0d431b",
  derivedVia: "web3.eth.personal.sign",
  signedMessage:
    "localhost wants you to sign in with your Ethereum account:\n" +
    "0x1c8fD29AfA0a3606cfF74A7119e55aDcC0e37D5c\n" +
    "\n" +
    "This is a test statement.  You can put anything you want here.\n" +
    "\n" +
    "URI: https://localhost/login\n" +
    "Version: 1\n" +
    "Chain ID: 1\n" +
    "Nonce: SiLYEkzyMM3bkJynC\n" +
    "Issued At: 2023-07-28T23:12:38.347Z",
  address: "0x1c8fD29AfA0a3606cfF74A7119e55aDcC0e37D5c",
};

export const runLitAction = async (
  authSig,
  ipfsId,
  message,
  pkpPubKey,
  sigName = "sig1",
  network = "serrano",
  debug = true,
  additionalParams = {},
  additionalClientParams = {}
) => {
  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    litNetwork: network,
    debug: debug,
    ...additionalClientParams,
  });
  await litNodeClient.connect();
  const results = await litNodeClient.executeJs({
    ipfsId: ipfsId,
    authSig,
    jsParams: {
      message: message,
      publicKey: pkpPubKey,
      sigName: sigName,
      ...additionalParams,
    },
  });
  console.log("results: ", results);
};

runLitAction();
