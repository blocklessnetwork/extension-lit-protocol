const Dllify = require("@blocklessnetwork/dllify");
const LitJsSdk = require("lit-js-sdk/build/index.node.js");
const { initWasmBlsSdk } = require("lit-js-sdk/build/index.node.js");

globalThis.litConfig = {
  debug: false,
};

async function main() {
  // ensure the wasm file is loaded
  await initWasmBlsSdk();

  // Create a CGI Runtime Extension
  const litExtension = new Dllify.CGIExtension({
    name: "bls-lit-extension",
    alias: "lit-extension",
    description: "Lit extension for Blockless Runtime",
  });

  // Export methods to runtime
  litExtension.export("verifyJWT", async (jwt) => {
    const { verified, header, payload } = LitJsSdk.verifyJwt({ jwt });
    return JSON.stringify({ verified, header, payload });
  });

  litExtension.export(
    "runLitAction",
    async (litActionCode, authSig, params) => {
      const litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: "serrano",
      });
      await litNodeClient.connect();
      const signatures = await litNodeClient.executeJs({
        code: litActionCode,
        authSig,
        jsParams: params,
      });
      return signatures;
    }
  );

  await litExtension.execute();
}

main();
