var schema = require("./collection_schemas.json");
const { DataTypes } = require("sequelize");

let sql = fix_schema_sql();
let mongod = {};

function sql_schema(type) {
  switch (type) {
    case "text":
      return DataTypes.TEXT;
    default:
      return DataTypes.TEXT;
  }
}

function fix_schema_sql() {
  let __schema = {};
  for (let key of Object.keys(schema)) {
    let obj = {};
    for (let k of Object.keys(schema[key])) {
      obj[k] = sql_schema(schema[key][k]);
    }
    __schema[key.replaceAll(".", "__")] = obj;
  }
  return __schema;
}

module.exports = {
  sql, mongod
};
