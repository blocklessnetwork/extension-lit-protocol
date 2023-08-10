import { Console } from "as-wasi/assembly";
import { cgi, json } from "@blockless/sdk";

function isExtensionAvailable(alias: string): boolean {
  let extensions = cgi.cgiExtendsList();
  let isMatch = false;

  if (extensions && extensions.length > 0) {
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i];
      if (alias === extension.alias) {
        isMatch = true;
      }
    }
  }

  return isMatch;
}

function testLitProtocol(): void {
  let command = new cgi.CgiCommand("lit-extension", [], []);
  let rs = command.exec();

  if (rs === true) {
    Console.log(`Start Verify JWT ...`);
    const verifyJwtResponse = command.callMethod("verifyJWT", [
      "eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweGZmZjE3NWMxNGEyOTllZjcwMjdkYTBkMzQ4ZjQzOGUxNTQ4ODBjY2QiLCJjaGFpbiI6ImV0aGVyZXVtIiwiaWF0IjoxNjc2NDQ0NTcwLCJleHAiOjE2NzY0ODc3NzAsImJhc2VVcmwiOiJsaXQtdGVzdC5ibHMuZGV2IiwicGF0aCI6Ii81Ym9uanB4NHE2Nmoxbng2c2ZoZjEiLCJvcmdJZCI6IiIsInJvbGUiOiIiLCJleHRyYURhdGEiOiIifQ.puWAqp82-1OM-jiHwl2jFroforAU7A5DY_4u9lXZ9KbuPHFcXQB-ovWN9DWfD7DGBf-KxT5_6f5Ii0cHmWi3TAFv-KAVkIYPAX-r_6tV6_ot2mle8pU7f43O_I_mjxwi",
    ]);
    Console.log(`Verify JWT Response:`);
    Console.log(verifyJwtResponse);

    Console.log(`Start Lit action ...`);

    const authSigEncoder = new json.JSONEncoder();
    authSigEncoder.pushObject(null);
    authSigEncoder.setString(
      "sig",
      "QmQ5yzoCvYcdW6kBqUnFXx6ZNJzQRAsthDvthutwoPggrL"
    );
    authSigEncoder.setString("derivedVia", "web3.eth.personal.sign");
    authSigEncoder.setString(
      "signedMessage",
      "localhost wants you to sign in with your Ethereum account:\n" +
        "0x1c8fD29AfA0a3606cfF74A7119e55aDcC0e37D5c\n" +
        "\n" +
        "This is a test statement.  You can put anything you want here.\n" +
        "\n" +
        "URI: https://localhost/login\n" +
        "Version: 1\n" +
        "Chain ID: 1\n" +
        "Nonce: SiLYEkzyMM3bkJynC\n" +
        "Issued At: 2023-07-28T23:12:38.347Z"
    );
    authSigEncoder.setString(
      "address",
      "0x1c8fD29AfA0a3606cfF74A7119e55aDcC0e37D5c"
    );
    authSigEncoder.popObject();

    const paramsEncoder = new json.JSONEncoder();
    paramsEncoder.pushObject(null);
    paramsEncoder.pushArray("message");
    paramsEncoder.setInteger(null, 72);
    paramsEncoder.setInteger(null, 101);
    paramsEncoder.setInteger(null, 108);
    paramsEncoder.setInteger(null, 108);
    paramsEncoder.setInteger(null, 111);
    paramsEncoder.setInteger(null, 32);
    paramsEncoder.setInteger(null, 87);
    paramsEncoder.setInteger(null, 111);
    paramsEncoder.setInteger(null, 114);
    paramsEncoder.setInteger(null, 108);
    paramsEncoder.setInteger(null, 100);
    paramsEncoder.popArray();
    paramsEncoder.setString(
      "publicKey",
      "0x04e7405c1065b782bb6f003d9a8266792d2834c9fffe9f6f12a88474255564723ac288f8e543d64011471253c77f18d456ce077c409115cb0f33495b014d4a6a50"
    );
    paramsEncoder.setString("sigName", "sig1");
    paramsEncoder.popObject();

    const runLitActionResponse = command.callMethod("executeJs", [
      "QmQ5yzoCvYcdW6kBqUnFXx6ZNJzQRAsthDvthutwoPggrL",
      authSigEncoder.toString(),
      paramsEncoder.toString(),
    ]);

    Console.log(`Lit Action Response:`);
    Console.log(runLitActionResponse);
  }
}

if (isExtensionAvailable("lit-extension")) {
  testLitProtocol();
} else {
  Console.log("Extension not available.");
}
