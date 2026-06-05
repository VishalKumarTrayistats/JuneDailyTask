const sql = require("mssql");

const dbConfig = {
  server: "localhost",
  database: "TodoDB",

  options: {
    instanceName: "SQLEXPRESS",
    trustServerCertificate: true,
    encrypt: false,
  },

  authentication: {
    type: "default",
    options: {
      userName: "express3",
      password: "root",
    },
  },
};

let pool;

const connectDB = async () => {
  try {
    pool = await sql.connect(dbConfig);
    console.log("✅ MSSQL Connected");
  } catch (error) {
    console.log("❌ Database Error");
    console.log(error);
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database not connected");
  }

  return pool;
};

module.exports = {
  sql,
  connectDB,
  getPool,
};