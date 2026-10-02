import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function startProcess(command, args) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: process.env,
    shell: false,
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      console.error(`${command} exited via signal ${signal}`);
      process.exit(1);
    }

    if (code !== 0) {
      console.error(`${command} exited with code ${code}`);
      process.exit(code ?? 1);
    }
  });

  return child;
}

const server = startProcess(process.execPath, ['server/index.js']);
const vite = startProcess(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0']);

const children = [server, vite];

for (const child of children) {
  child.on('exit', () => {
    for (const other of children) {
      if (other !== child && other.exitCode === null) {
        other.kill('SIGTERM');
      }
    }
  });
}

process.on('SIGINT', () => {
  for (const child of children) {
    if (child.exitCode === null) child.kill('SIGINT');
  }
});

process.on('SIGTERM', () => {
  for (const child of children) {
    if (child.exitCode === null) child.kill('SIGTERM');
  }
});
