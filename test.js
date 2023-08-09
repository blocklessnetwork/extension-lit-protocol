const { exec } = require("child_process");
const packageJson = require("./package.json");

// Get the command and parameters from command-line arguments
const command = process.argv[2];
const parameters = process.argv.slice(3);

// Assemble the payload as an object
const payload = {
  method: command,
  parameters: parameters,
};

// Convert the payload to a JSON string and calculate its length
const payloadStr = JSON.stringify(payload);
const length = Buffer.byteLength(payloadStr, "utf8");

// Construct the shell command with the length and payload
const commandStr = `echo -e "${length}\\r\\n${payloadStr.replace(
  /"/g,
  '\\"'
)}" | ./build/${packageJson.name}`;

console.log(commandStr);

// Execute the shell command
exec(commandStr, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
