
const pool = require('../db');

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error("Error getting users", error);
        res.status(500).json({ error: 'An error occurred while getting users' });
    }
}

export const Signup = async (req, res) => {

    const body = req.body;

    if(body.password !== body.confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }   

}



