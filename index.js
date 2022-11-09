const dllify = require("@blocklessnetwork/dllify");
const LitJsSdk = require("lit-js-sdk");
// this function will be called from C interface
// a message from ipc is passed in with jwt property
// export the return for testing
const verifyJwt = dllify.export("verifyJwt", ({ jwt }) => {
  // perform jwt verification
  const { verified, header, payload } = LitJsSdk.verifyJwt({ jwt });

  // return jwt verification result
  return { verified, header, payload };
});

module.exports = {
  verifyJwt,
};
