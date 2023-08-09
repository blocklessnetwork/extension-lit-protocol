import { Console } from "as-wasi/assembly";
import { CgiCommand } from "@blockless/sdk/assembly/cgi";
import { buffer2string } from "@blockless/sdk/assembly/strings";
import { JSONEncoder } from "@blockless/sdk/assembly/json";
// import { verifyJWT } from "../assembly/lit";

// function test_list_cgi(): void {
//   let l = cgiExtendsList();
//   if (l != null) Console.log(`${l}`);
// }

// test_list_cgi();

const encoder = new JSONEncoder();
encoder.pushObject(null);
encoder.setString("method", "echo");
encoder.pushArray("parameters");
encoder.setString(
  null,
  "eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweDUwZTJkYWM1ZTc4YjU5MDVjYjA5NDk1NTQ3NDUyY2VlNjQ0MjZkYjIiLCJjaGFpbiI6InBvbHlnb24iLCJpYXQiOjE2NjgwMjg3OTIsImV4cCI6MTY2ODA3MTk5MiwiYmFzZVVybCI6Im15LWR5bmFtaWMtY29udGVudC1zZXJ2ZXIuY29tIiwicGF0aCI6Ii9haXh3emhuc2hoc3cxMTliNWU0c2tlIiwib3JnSWQiOiIiLCJyb2xlIjoiIiwiZXh0cmFEYXRhIjoiIn0.ocHC0tcGUcHaweEuZXdXRgYNFUFXrsNZmxA-q49mhNehPfXrU1wGo7To6Jbtz_mNALpJ7Hf8_vQ_Vg-Qb1-uIIIG-EPt2Pg1tX5OA-aDeyU0F12xwGu8nGjJCkZI8jfJ"
);
encoder.popArray();
encoder.popObject();

//   parameters: [ //   method: "verifyJWT", // const payload = {
//     "eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweDUwZTJkYWM1ZTc4YjU5MDVjYjA5NDk1NTQ3NDUyY2VlNjQ0MjZkYjIiLCJjaGFpbiI6InBvbHlnb24iLCJpYXQiOjE2NjgwMjg3OTIsImV4cCI6MTY2ODA3MTk5MiwiYmFzZVVybCI6Im15LWR5bmFtaWMtY29udGVudC1zZXJ2ZXIuY29tIiwicGF0aCI6Ii9haXh3emhuc2hoc3cxMTliNWU0c2tlIiwib3JnSWQiOiIiLCJyb2xlIjoiIiwiZXh0cmFEYXRhIjoiIn0.ocHC0tcGUcHaweEuZXdXRgYNFUFXrsNZmxA-q49mhNehPfXrU1wGo7To6Jbtz_mNALpJ7Hf8_vQ_Vg-Qb1-uIIIG-EPt2Pg1tX5OA-aDeyU0F12xwGu8nGjJCkZI8jfJ",
//   ],
// };

// Console.log(encoder.toString());
// function replaceAll(
//   input: string,
//   search: string,
//   replacement: string
// ): string {
//   let result = "";
//   let previousIndex = 0;
//   let index = input.indexOf(search);
//   while (index !== -1) {
//     result += input.substring(previousIndex, index) + replacement;
//     previousIndex = index + search.length;
//     index = input.indexOf(search, previousIndex);
//   }
//   result += input.substring(previousIndex);
//   return result;
// }

function verifyJWT(): void {
  let command = new CgiCommand("lit", ["verifyJWT", "hello"], null);
  let rs = command.exec();
  if (rs == true) {
    Console.log("executed");
    let buf = new Array<u8>(1024);
    let l = command.stdoutRead(buf);
    Console.log(`stdout readbytes len:${l}`);
    let read_string = buffer2string(buf, l);
    Console.log(read_string);
  }
  command.close();
}

verifyJWT();
