import * as express from 'express'
import SqlConnector from '../controllers/SqlConnector'

const router = express.Router()
/* GET users listing. */
router.get(`/getOne`, async function(req : any, res : any, next : any) {
  let connector = SqlConnector.getInstance();
  const result = await connector.select(`select * from UserLogins`)
  res.send(JSON.stringify(result.recordset))
})

router.get('/', function(req: any, res: any, next: any){
  res.send('SHalom Route!')
})

export default router