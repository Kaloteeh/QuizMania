import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'quizMania',
    password: 'postgres54321',
    port: 5432,
});

// module.exports = pool;