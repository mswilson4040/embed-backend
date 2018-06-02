import * as ModelerApi from './modeler/modelerApi';
import * as DatabaseApi from './database/databaseApi';
import * as MongoConfigApi from './mongo/mongo-config-api';

class Server {

    private _express: any = null;
    private _app: any = null;
    private _bodyParser: any = null;
    private _path: any = null;
    private _server: any = null;
    private _cors: any = null;

    constructor() {
        this._cors = require('cors');
        this._express = require('express');
        this._app = this._express();
        this._bodyParser = require('body-parser');
        this._path = require('path');
        this._server = require('http').createServer(this._app);
        this._server.listen(process.env.PORT || 3000);
        this._app.use(this._bodyParser.urlencoded({extended: true}));
        this._app.use(this._bodyParser.json());
        this._app.use(this._express.static(this._path.join(__dirname + './')));
        this._app.use(this._cors());
        this._app.use('/model', ModelerApi);
        this._app.use('/database', DatabaseApi);
        this._app.use('/mongo', MongoConfigApi);


        console.log(`server listening on ${process.env.PORT || 3000}`);

    }
}

new Server();