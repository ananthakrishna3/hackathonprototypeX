const { Pool } = require("pg")
const config = "postgres://postgres:5KtWbqErw3mJZaM3@quarterly-undoubted-rabbit.data-1.use1.tembo.io:5432/postgres";
const pool = new Pool({ connectionString: config, ssl: { rejectUnauthorized: false } });
module.exports = {pool};
