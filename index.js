const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

let instream = fs.createReadStream('./data/t2.users.example');
let outstream = new stream;
let lineReader = readline.createInterface(instream, outstream);

const USER_PROPS = [
  'username',
  'username_canonical',
  'hostmask',
  'points_day', 'questions_day',
  'points_week', 'questions_week',
  'points_month', 'questions_month',
  'points_total', 'questions_total',
  'created_at', 'updated_at'
  ];

lineReader.on('line', (line) => {
  // read user lines only
  if (line.startsWith(':N:')) {
    // log to console
    console.log(JSON.stringify(lineToObject(line)));
  } // end if
});

lineReader.on('close', () => {
  console.log('\n');
});

/**
 * Converts line string into JS object
 */
const lineToObject = (line) => {
  // convert line string into line array
  let line_arr = line.slice(3).slice(0, -4).split(' ');
  // convert line array into line object
  let line_obj = {};
  for (var i = 0; i < line_arr.length; i++) {
    line_obj[USER_PROPS[i]] = line_arr[i];
    // look for `username_canonical`,
    // use `username` if not found
    if (USER_PROPS[i] === 'username_canonical') {
      if (line_arr[i] === '*') {
        line_obj[USER_PROPS[i]] = line_arr[0];
      } // end if
    } // end if
  } // end for
  return line_obj;
};
