const Pool = require("pg").Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "nara3104",
        host: "localhost",
        port: 5432,
        database: "moviedb"
    }
);

module.exports = pool;