import * as sql from "mssql/msnodesqlv8"

export type DbConfig = { 
    database? : string,
    server? : string,
    driver? : string,
    connectionString? : string,
    options? : {}
}

class SqlConnector {
    private static instance: SqlConnector
    private config : sql.ConnectionPool;
    public pool;

    static getInstance = (config? : DbConfig) => {
        if (!SqlConnector.instance){
            SqlConnector.instance = new SqlConnector()
            SqlConnector.instance.config = new sql.ConnectionPool(config)
        }
        return SqlConnector.instance;
    }

    connect = async () => {
        try {
            if (SqlConnector.instance.pool) {
                console.log("Connection pool already exists, returning live pool")
                return SqlConnector.instance.pool
            }
            console.log("Initiating new connection pool")
            SqlConnector.instance.pool = await SqlConnector.instance.config.connect()
            SqlConnector.instance.pool.on("error", async (err : Error) => {
                console.log("Connection pool error")
            })
            return SqlConnector.instance.pool
        }
        catch ( err ) {
            console.log(`Error connecting to sql server. Error: ${err}`)
            SqlConnector.instance.pool = null
        }
    }
    
    
    select = async (query : string) => {
        try{
            return await SqlConnector.instance.pool.query(query)
        }
        catch(err){
            console.log(`Query failed executing. Nested error: ${err}`)
        }
    }
    
    close = async () => {
        try {
            await SqlConnector.instance.pool.close()
            SqlConnector.instance.pool = null
        }
        catch ( err ) {
            SqlConnector.instance.pool = null
            console.log("Could not close pool")
        }
    }
    
}

export default SqlConnector