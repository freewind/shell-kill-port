import {execSync} from 'child_process';

type ExecResult = {
  ok: boolean,
  stdout: string,
  stderr: string,
}

export function exec(command: string): ExecResult {
  try {
    const output = execSync(command, {
      encoding: 'utf8',
    });
    return {
      ok: true,
      stdout: output,
      stderr: ''
    }
  } catch (e) {
    return {
      ok: false,
      stdout: e.stdout,
      stderr: e.stderr
    }
  }
}

export function getSingleArgument(argumentName: string): string {
  const argument = process.argv[2]
  if (argument) {
    return argument;
  } else {
    throw new Error(`Expect a single argument as ${argumentName}`)
  }
}

export function findFirstPid(result: string): number | null {
  const lines = result.split(/\n/);

  const targetLine = lines[1];
  if (targetLine) {
    const items = targetLine.split(/\s+/);
    const pid = items[1];
    return parseInt(pid);
  } else {
    return null;
  }

}

export function killPid(pid: number) {
  const command = `kill -9 ${pid}`;
  console.log(command);
  exec(command);
}

