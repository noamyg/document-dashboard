import express = require('express');
import path = require('path');
import http = require('http');
import bodyParser = require('body-parser');
import msp = require('./routes/msp');

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
}