# bogus-to-triviatime

This is a script to parse the `t2.users` file found in BogusTrivia and generate an SQLite statement so that the scores can be migrated into the TriviaTime script.

This script is being created for the `#trivia` channel on irc.snoonet.org and may not necessarily be optimised for general usage.

## BogusTrivia `t2.users` Schema

```
:N:username user hostmask points_day questions_day points_week questions_week points_month questions_month points questions created_at updated_at
```

## TriviaTime SQLite Schema

SQLite schema for `triviauserlog`:
```
CREATE TABLE triviauserlog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  points_made INTEGER,
  num_answered INTEGER,
  day INTEGER,
  month INTEGER,
  year INTEGER,
  last_updated INTEGER,
  average_time INTEGER,
  average_score INTEGER,
  username_canonical TEXT,
  channel TEXT,
  channel_canonical TEXT,
  UNIQUE(username_canonical, channel_canonical, day, month, year) ON CONFLICT REPLACE)
);
```
