import express = require('express');
import connector = require('./../controllers/sqlConnector')

let router = express.Router();
/* GET users listing. */
router.get(`/:reqId/:userId`, async function(req : any, res : any, next : any) {
  await connector.connect();
  const result = await connector.select(`select * from entities`);
  res.send(JSON.stringify(result.recordset));
});

module.exports = router;
