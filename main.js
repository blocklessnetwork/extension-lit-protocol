import { CGIExtension } from "../nodejs-dllify";

async function main() {
  const litExtension = new CGIExtension({
    name: "lit-cgi-extension",
    alias: "lit",
    description: "Lit extension for Blockless Runtime built with Deno",
  });
}

main();
