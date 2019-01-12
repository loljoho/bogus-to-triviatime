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

const SQL_PROPS = [
  'username',
  'points_made',
  'num_answered',
  'day', 'month', 'year',
  'last_updated',
  'average_time',
  'average_score',
  'username_canonical',
  'channel', 'channel_canonical'
  ];

lineReader.on('line', (line) => {
  // read user lines only
  if (line.startsWith(':N:')) {
    // log to console
    //console.log(JSON.stringify(lineToObject(line)));
    objectToRow(lineToObject(line));
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

/**
 * Converts JS object into SQL row
 */
const objectToRow = (line_obj) => {
  let line_row = '(';
  line_row += '"' + line_obj.username + '", ';
  line_row += line_obj.points_total + ', ';
  line_row += line_obj.questions_total + ', ';
  // convert linux epoch to day, month, year
  let epoch = new Date(parseInt(line_obj.created_at + '000', 10));
  line_row += epoch.getDay() + ', ';
  line_row += epoch.getMonth() + ', ';
  line_row += epoch.getFullYear() + ', ';
  line_row += line_obj.updated_at + ', ';
  line_row += 'avg_time, ';
  line_row += 'avg_score, ';
  line_row += '"' + line_obj.username_canonical + '", ';
  line_row += '"#trivia", ';
  line_row += '"#trivia"';
  line_row += '),';
  console.log(line_row);
  return line_row;
}
