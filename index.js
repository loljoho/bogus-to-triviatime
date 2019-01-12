const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

let instream = fs.createReadStream('./data/t2.users.example');
let outstream = new stream;
let lineReader = readline.createInterface(instream, outstream);

lineReader.on('line', (line) => {
  if (line) {
    console.log(line);
  }
});

lineReader.on('close', () => {
  console.log('Finished.');
});