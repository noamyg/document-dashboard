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
const express = require("express");
const SqlConnector_1 = require("../controllers/SqlConnector");
let router = express.Router();
/* GET users listing. */
router.get(`/:reqId/:userId`, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let connector = new SqlConnector_1.default;
        const result = yield connector.select(`select * from entities`);
        res.send(JSON.stringify(result.recordset));
    });
});
router.get('/', function (req, res, next) {
    res.send('SHalom Route!');
});
exports.default = router;
//# sourceMappingURL=msp.js.map