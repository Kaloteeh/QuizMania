import dotenv from 'dotenv';
import express from "express"; 
import {pool} from './db.js';
import {routes} from './routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:5173','http://localhost:3001','http://localhost:8080'];

const res = await pool.query('SELECT * from user');

let database = 'not working'
const handleDatabase = () => {
    database = 'working';
}

if (res.rows !== 0) {
    handleDatabase();
}
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
app.use('/',routes())


app.get('/test-db-connection', async (req, res) => {
    console.log('Testing database connection');
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful');
        res.json({message: 'Database connection successful', timestamp: result.rows[0].now});
    } catch (error) {
        console.error("Error testing database connection", error);
        res.status(500).json({ error: 'An error occurred while testing the database connection' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`,'Database is ' +database);
}); 
