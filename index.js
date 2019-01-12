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
    // slice beginning and end of line
    let line_str = line.slice(3).slice(0, -4);
    // split line into array
    let line_arr = line_str.split(' ');

    // convert line into object
    let line_obj = {};
    for (var i = 0; i < line_arr.length; i++) {
      line_obj[USER_PROPS[i]] = line_arr[i];
      // canonical usernames
      if (i === 1) {
        if (line_arr[i] === '*') {
          line_obj[USER_PROPS[i]] = line_arr[0];
        }
      }
    }

    // log to console
    console.log(JSON.stringify(line_obj));
  } // end if
});

lineReader.on('close', () => {
  console.log('\n');
});
