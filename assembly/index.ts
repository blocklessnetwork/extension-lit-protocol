import { Console } from "as-wasi/assembly"
import { cgi } from "@blockless/sdk"

function isExtensionAvailable(alias: string): boolean {
  let extensions = cgi.cgiExtendsList()
  let isMatch = false

  if (extensions && extensions.length > 0) {
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i]
      if (alias === extension.alias) {
        isMatch = true
      }
    }
  }

  return isMatch
}

function testLitProtocol(): void {
  let command = new cgi.CgiCommand("lit-extension", [], [])
  let rs = command.exec()

  if (rs === true) {
    Console.log(`Start Verify JWT ...`)
    const verifyJwtResponse = command.callMethod(
      'verifyJWT',
      [
        "eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweGZmZjE3NWMxNGEyOTllZjcwMjdkYTBkMzQ4ZjQzOGUxNTQ4ODBjY2QiLCJjaGFpbiI6ImV0aGVyZXVtIiwiaWF0IjoxNjc2NDQ0NTcwLCJleHAiOjE2NzY0ODc3NzAsImJhc2VVcmwiOiJsaXQtdGVzdC5ibHMuZGV2IiwicGF0aCI6Ii81Ym9uanB4NHE2Nmoxbng2c2ZoZjEiLCJvcmdJZCI6IiIsInJvbGUiOiIiLCJleHRyYURhdGEiOiIifQ.puWAqp82-1OM-jiHwl2jFroforAU7A5DY_4u9lXZ9KbuPHFcXQB-ovWN9DWfD7DGBf-KxT5_6f5Ii0cHmWi3TAFv-KAVkIYPAX-r_6tV6_ot2mle8pU7f43O_I_mjxwi"
      ]
    )
    Console.log(`Verify JWT Response:`)
    Console.log(verifyJwtResponse)

    Console.log(`Start Lit action ...`)
    const runLitActionResponse = command.callMethod(
      'runLitAction',
      [

      ]
    )
    Console.log(`Lit Action Response:`)
    Console.log(runLitActionResponse)
  }
}

if (isExtensionAvailable('lit-extension')) {
  testLitProtocol()
} else {
  Console.log('Extension not available.')
}