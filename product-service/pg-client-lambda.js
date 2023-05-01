import { createConnection } from 'typeorm';

const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
});

// Now we can use the connection to query the database
const carts = await connection.query('SELECT * FROM carts');