"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const index = require("./routes/index");
const SqlConnector_1 = require("./controllers/SqlConnector");
const environment_1 = require("./environments/environment");
class App {
    constructor() {
        this.connectToDb = (config) => {
            let connector = SqlConnector_1.default.getInstance(config);
            connector.connect();
        };
        this.mountRoutes = () => {
            console.log('Mounting routes...');
            const router = express.Router();
            router.use(bodyParser.json());
            router.use(bodyParser.urlencoded({ extended: false }));
            router.use('/', index.default);
            this.express.use('/', router);
        };
        this.runServer = () => {
            this.express.listen(this.port, (err) => {
                if (err) {
                    return console.log(err);
                }
                return console.log(`Server is listening on ${this.port}`);
            });
        };
        this.port = process.env.PORT || 3000;
        this.express = express();
        this.connectToDb(environment_1.documentServiceDb);
        this.mountRoutes();
        this.runServer();
    }
}
exports.default = new App().express;
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
//# sourceMappingURL=App.js.map