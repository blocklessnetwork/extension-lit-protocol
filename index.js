const Dllify = require("@blocklessnetwork/dllify");
const LitJsSdk = require("lit-js-sdk");

const LitNodeClient = require("@lit-protocol/lit-node-client");

async function main() {
  //   // ensure the wasm file is loaded
  await LitJsSdk.initWasmBlsSdk();

  // Create a CGI Runtime Extension
  const litExtension = new Dllify.CGIExtension({
    name: "bls-lit-extension",
    alias: "lit-extension",
    description: "Lit extension for Blockless Runtime",
  });

  // Export methods to runtime
  litExtension.export("verifyJWT", async (jwt) => {
    global.console = {
      log: (...args) => {},
    };
    const { verified, header, payload } = LitJsSdk.verifyJwt({
      jwt,
    });
    return JSON.stringify({ verified, header, payload });
  });

  litExtension.export("executeJs", async (litActionCode, authSig, jsParams) => {
    global.console = {
      log: (...args) => {},
    };

    const litNodeClient = new LitNodeClient.LitNodeClient({
      litNetwork: "serrano",
    });

    await litNodeClient.connect();

    const signatures = await litNodeClient.executeJs({
      ipfsId: litActionCode,
      authSig,
      jsParams,
    });

    return JSON.stringify({ signatures });
  });

  await litExtension.execute();
}

main();
