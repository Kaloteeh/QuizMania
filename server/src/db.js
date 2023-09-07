const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lab1projectdb',
    password: 'postgres54321',
    port: 5432,
});

module.exports = pool;