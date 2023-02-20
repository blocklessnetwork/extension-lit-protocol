const Dllify = require("@blocklessnetwork/dllify");
var LitJsSdk = require("lit-js-sdk/build/index.node.js");
const { initWasmBlsSdk } = require("lit-js-sdk/build/index.node.js");

globalThis.litConfig = {
  debug: false,
};

async function sleep(wait) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), wait);
  });
}

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

  await litExtension.execute();
}

main();
