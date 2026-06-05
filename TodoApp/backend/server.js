const express = require("express");
const app = express();
const sql = require("mssql");
const cors = require("cors");
const { getUsers } = require("./controllers/todo");

app.use(cors());
app.use(express.json());

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

// Database Connection
sql.connect(dbConfig)
  .then(() => {
    console.log("✅ Connected to SQL Server");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });


// ======================
// GET ALL TODOS
// ======================

app.get("/allusers",getUsers)
app.get("/getTodo", async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT * FROM Todoss`);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching todos" });
  }
});


// ======================
// CREATE TODO
// ======================
app.post("/createTodo", async (req, res) => {
  try {
    const { Name,Age } = req.body;

 const result=  await sql.query(`
  INSERT INTO Todoss (Name, Age)
  VALUES ('${Name}', ${Age})
`);
console.log(result);
    res.status(201).json({
      name:Name,
      age:Age,
      message: "Todo Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating todo" });
  }
});


// ======================
// UPDATE TODO
// ======================
app.put("/updateTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    await sql.query(`
      UPDATE Todos
      SET Title='${title}'
      WHERE Id=${id}
    `);

    res.status(200).json({
      message: "Todo Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating todo" });
  }
});


// ======================
// DELETE TODO
// ======================
app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await sql.query(`
      DELETE FROM Todos
      WHERE Id=${id}
    `);

    res.status(200).json({
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting todo" });
  }
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});