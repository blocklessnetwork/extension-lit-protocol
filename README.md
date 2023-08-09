# lit-protocol-extension

this is a lit protocol extension built for blockless networking using @blocklessnetwork/dllify

# usage

build the binary

```bash
$ yarn build
```

then execute a test method

```bash
$ yarn test verifyJWT eyJhbGciOiJCTFMxMi0zODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJMSVQiLCJzdWIiOiIweDUwZTJkYWM1ZTc4YjU5MDVjYjA5NDk1NTQ3NDUyY2VlNjQ0MjZkYjIiLCJjaGFpbiI6InBvbHlnb24iLCJpYXQiOjE2NjgwMjg3OTIsImV4cCI6MTY2ODA3MTk5MiwiYmFzZVVybCI6Im15LWR5bmFtaWMtY29udGVudC1zZXJ2ZXIuY29tIiwicGF0aCI6Ii9haXh3emhuc2hoc3cxMTliNWU0c2tlIiwib3JnSWQiOiIiLCJyb2xlIjoiIiwiZXh0cmFEYXRhIjoiIn0.ocHC0tcGUcHaweEuZXdXRgYNFUFXrsNZmxA-q49mhNehPfXrU1wGo7To6Jbtz_mNALpJ7Hf8_vQ_Vg-Qb1-uIIIG-EPt2Pg1tX5OA-aDeyU0F12xwGu8nGjJCkZI8jfJ
```

output

```bash
{"verified":true,"header":{"alg":"BLS12-381","typ":"JWT"},"payload":{"iss":"LIT","sub":"0x50e2dac5e78b5905cb09495547452cee64426db2","chain":"polygon","iat":1668028792,"exp":1668071992,"baseUrl":"my-dynamic-content-server.com","path":"/aixwzhnshhsw119b5e4ske","orgId":"","role":"","extraData":""}}
```

## building the C example

using `wasi-sdk`

```bash
WASI_SDK_PATH=/path/to/wasi-sdk
$WASI_SDK_PATH/bin/clang --sysroot=$WASI_SDK_PATH/share/wasi-sysroot example.c -o example.wasm -O3
```
