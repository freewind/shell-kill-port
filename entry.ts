import {getSingleArgument, findFirstPid, killPid, exec} from './common';

function listPortProcess(port: number): string {
  return exec(`lsof -i tcp:${port}`).stdout;
}

function main() {
  const port = parseInt(getSingleArgument('port'));
  const result = listPortProcess(port);
  const pid = findFirstPid(result);
  if (pid) {
    killPid(pid);
    console.log('Killed!');
  } else {
    console.log('No target found');
  }
}

main()

