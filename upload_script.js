import readline from "readline";
import { spawn } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the directory path (e.g., dist/assets): ", (dir) => {
  // Use the entered directory path in the upload command
  const uploadCommand = `${dir}`;

  // Execute the upload command
  const uploadProcess = spawn(uploadCommand, { shell: true });

  // Stream output from the process
  uploadProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  uploadProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  uploadProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
    rl.close();
  });
});
