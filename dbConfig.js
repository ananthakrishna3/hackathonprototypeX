// require("dotenv").config();

// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction
// });

// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
//   });


// module.exports = {pool}

const { Pool } = require("pg")
const config = "postgres://postgres:5KtWbqErw3mJZaM3@quarterly-undoubted-rabbit.data-1.use1.tembo.io:5432/postgres";
const pool = new Pool({ connectionString: config, ssl: { rejectUnauthorized: false } });
module.exports = {pool};