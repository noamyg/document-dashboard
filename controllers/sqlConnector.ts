import sql = require("mssql/msnodesqlv8");

const config = new sql.ConnectionPool({
    database: "MSP_CAL",
    server: "localhost",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }
});

var pool: sql.ConnectionPool = null;

module.exports.connect = async () => {
    try {
        if (pool) {
            console.log("Connection pool already exists, returning live pool");
            return pool;
        }
        console.log("Initiating new connection pool");
        pool = await config.connect();
        pool.on("error", async (err : Error) => {
            console.log("Connection pool error");
        });
        return pool;
    }
    catch ( err ) {
        console.log("Error connecting to sql server");
        pool = null;
    }
}

module.exports.select = async (query : string) => {
    try{
        return await pool.query(query)
    }
    catch(err){
        console.log(`Query failed executing. Nested error: ${err}`)
    }
}

module.exports.close = async () => {
    try {
        await pool.close();
        pool = null;
    }
    catch ( err ) {
        pool = null;
        console.log("Could not close pool");
    }
};