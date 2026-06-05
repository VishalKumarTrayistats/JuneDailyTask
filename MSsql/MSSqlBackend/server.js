const express = require('express');
const sql = require('mssql');

const app = express();
app.use(express.json());

// const dbConfig = {
//     server: '68.178.207.198',
//     database: 'learning_tsplatform', // change to your database name
//     user: 'learning_staging',
//     password: '@learn$Staging@123106',
//     // options: {
//     //     instanceName: 'SQLEXPRESS',
//     //     trustServerCertificate: true
//     // }
//     options: {
//     encrypt: true,
//     trustServerCertificate: true
//   }

// };


const dbConfig = {
  server: 'localhost',
  database: 'MyDB',
  options: {
    instanceName: 'SQLEXPRESS',
    trustServerCertificate: true,
    encrypt: false
  },
  authentication: {
    type: 'default',
    options: {
      userName: 'express3',
      password: 'root'
    }
  }
};

// Connect to SQL Server
sql.connect(dbConfig)
    .then(() => {
        console.log('✅ Connected to SQL Server');
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
    });

// Home Route
app.get('/', (req, res) => {
    res.send('Express + SQL Server is running');
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Users WHERE Id = ${req.params.id}
        `;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add user
app.post('/users', async (req, res) => {
  try {
    const { FirstName, LastName, Email, Age } = req.body;

    await sql.query`
      INSERT INTO Users (FirstName, LastName, Email, Age)
      VALUES (${FirstName}, ${LastName}, ${Email}, ${Age})
    `;

    res.status(201).json({
      success: true,
      message: 'User added successfully'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});
// Update user
app.put('/users/:id', async (req, res) => {
    try {
        const { Name, Email } = req.body;

        await sql.query`
            UPDATE Users
            SET Name = ${Name},
                Email = ${Email}
            WHERE Id = ${req.params.id}
        `;

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        await sql.query`
            DELETE FROM Users
            WHERE Id = ${req.params.id}
        `;

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});