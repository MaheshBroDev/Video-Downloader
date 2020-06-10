const spawn = require("child_process").spawn;
const proc = spawn('bin/sum.exe', '11 12 11 6'.split(' '));


process.stdin.pipe(proc.stdin);

proc.stdout.on('data', (chunk) => {
    console.log('DATA ', chunk.toString() );
});

proc.stderr.on('data', (chunk) => {
  console.log('ERRSTD', chunk.toString());
});

proc.on('error', (err) => {
  console.error(err);
});

proc.on('exit', (code) => {
  console.log("Done");
});