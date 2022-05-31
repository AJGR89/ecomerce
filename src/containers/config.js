import {MONGODB_URI} from "../config"
const path = require('path')

const db_sqlite3 = require("knex")({
  client: "sqlite3",
  connection:{
    filename: path.resolve(__dirname,"../DB/ecommerce.sqlite"),
  },
  useNullAsDefault: true
});


module.exports = {
  db_sqlite3,
};
