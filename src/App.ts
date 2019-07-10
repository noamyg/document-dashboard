import * as express from 'express'
import * as path from 'path'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as index from './routes/index'
import SqlConnector, { DbConfig } from './controllers/SqlConnector'
import { documentServiceDb } from './environments/environment';

class App {
  public express
  public pool
  private port : number
  
  constructor() {
    this.port = process.env.PORT || 3000
    this.express = express()
    this.connectToDb(documentServiceDb)
    this.mountRoutes()
    this.runServer()
  }

  private connectToDb = (config : DbConfig) =>{
    let connector = SqlConnector.getInstance(config)
    connector.connect()
  }

  private mountRoutes = () : void => {
    console.log('Mounting routes...')
    const router = express.Router()
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use('/', index.default)
    this.express.use('/', router)
  }

  private runServer = () : void => {
    this.express.listen(this.port, (err : Error) => {
      if (err) {
        return console.log(err)
      }
      return console.log(`Server is listening on ${this.port}`)
    })
  }
}

export default new App().express

/*
class App {
  public express : any
  private port : string = process.env.PORT || '3000';

  constructor(){
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()

    // Parsers for POST data
    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({ extended: false }))
    
    // Point static path to dist
    router.use(express.static(path.join(__dirname, 'dist')));

    //Set routes
    router.use('/data', msp)

    // Catch all other routes and return the index file
    router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })

    //Set port
    router.set('port', this.port);

    //create http server
    const server = http.createServer(router);
    
    //Listen on provided port, on all network interfaces.
    server.listen(this.port, () => console.log(`API running on localhost:${this.port}`));
    this.express.use('/', router)
  }
}*/