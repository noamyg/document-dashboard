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
const config = new sql.ConnectionPool({
    database: "MSP_CAL",
    server: "localhost",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
});
var pool = null;
module.exports.connect = () => __awaiter(this, void 0, void 0, function* () {
    try {
        if (pool) {
            console.log("Connection pool already exists, returning live pool");
            return pool;
        }
        console.log("Initiating new connection pool");
        pool = yield config.connect();
        pool.on("error", (err) => __awaiter(this, void 0, void 0, function* () {
            console.log("Connection pool error");
        }));
        return pool;
    }
    catch (err) {
        console.log("Error connecting to sql server");
        pool = null;
    }
});
module.exports.select = (query) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield pool.query(query);
    }
    catch (err) {
        console.log(`Query failed executing. Nested error: ${err}`);
    }
});
exports.default = close = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield pool.close();
        pool = null;
    }
    catch (err) {
        pool = null;
        console.log("Could not close pool");
    }
});
//# sourceMappingURL=sqlConnector.js.map