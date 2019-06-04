let { DB_USER, DB_PWD } = process.env;

if ([DB_USER, DB_PWD].includes(undefined)) {
  throw Error(
    'Database User and Password are not set. Check your environment variables'
  );
}

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PWD}@cluster0-ldy9l.mongodb.net/test?retryWrites=true&w=majority`;

module.exports = {
  DB_URI,
};
