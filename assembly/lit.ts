import { Console } from "as-wasi/assembly";
import { CgiCommand } from "@blockless/sdk/assembly/cgi";
import {
  buffer2string,
  string2buffer,
  arrayIndex,
} from "@blockless/sdk/assembly/strings";

export function verifyJWT(): void {
  let command = new CgiCommand("verifyJWT", ["123"], null);
  let rs = command.exec();
  if (rs == true) {
    Console.log("verifyJWT: true");
  }
  command.close();
}
