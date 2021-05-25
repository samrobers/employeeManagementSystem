const mysql = require("mysql");
const start = require("./list");
const list = require("./list");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "31427",
  database: "empMgmt_db",

  

start();
