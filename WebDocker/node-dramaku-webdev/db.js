const Pool = require("pg").Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "nara3104", //postgres, nara3104
        host: "database",
        port: 5432,
        database: "moviedb"
    }
);

module.exports = pool;