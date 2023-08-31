const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const pool = require('./db');

app.get('/test-db-connection', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({message: 'Database connection successful', timestamp: result.rows[0].now});
    } catch (error) {
        console.error("Error testing database connection", error);
        res.status(500).json({ error: 'An error occurred while testing the database connection' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 

