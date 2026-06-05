const sql = require("mssql");

const getUsers = async (req, res) => {
  try {
    const result = await sql.query(`
      select *from users;
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

module.exports = { getUsers };