"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql/msnodesqlv8");
class SqlConnector {
    constructor() {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (SqlConnector.instance.pool) {
                    console.log("Connection pool already exists, returning live pool");
                    return SqlConnector.instance.pool;
                }
                console.log("Initiating new connection pool");
                SqlConnector.instance.pool = yield SqlConnector.instance.config.connect();
                SqlConnector.instance.pool.on("error", (err) => __awaiter(this, void 0, void 0, function* () {
                    console.log("Connection pool error");
                }));
                return SqlConnector.instance.pool;
            }
            catch (err) {
                console.log(`Error connecting to sql server. Error: ${err}`);
                SqlConnector.instance.pool = null;
            }
        });
        this.select = (query) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield SqlConnector.instance.pool.query(query);
            }
            catch (err) {
                console.log(`Query failed executing. Nested error: ${err}`);
            }
        });
        this.close = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield SqlConnector.instance.pool.close();
                SqlConnector.instance.pool = null;
            }
            catch (err) {
                SqlConnector.instance.pool = null;
                console.log("Could not close pool");
            }
        });
    }
}
SqlConnector.getInstance = (config) => {
    if (!SqlConnector.instance) {
        SqlConnector.instance = new SqlConnector();
        SqlConnector.instance.config = new sql.ConnectionPool(config);
    }
    return SqlConnector.instance;
};
exports.default = SqlConnector;
//# sourceMappingURL=SqlConnector.js.map