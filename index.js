const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

let instream = fs.createReadStream('./data/t2.users');
let outstream = new stream;
let lineReader = readline.createInterface(instream, outstream);

const PROPS = ['username', 'username_canonical', 'hostmask', 'points_day', 'quests_day', 'points_week', 'quests_week', 'points_month', 'quests_month', 'points_made', 'num_answered', 'created', 'last_updated'];

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
      line_obj[PROPS[i]] = line_arr[i];
      // canonical usernames
      if (i === 1) {
        if (line_arr[i] === '*') {
          line_obj[PROPS[i]] = line_arr[0];
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