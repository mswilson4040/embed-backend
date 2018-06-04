"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as ModelerApi from './modeler/modelerApi';
// import * as DatabaseApi from './database/databaseApi';
var MongoConfigApi = require("./mongo/mongo-config-api");
var Server = /** @class */ (function () {
    function Server() {
        this._express = null;
        this._app = null;
        this._bodyParser = null;
        this._path = null;
        this._server = null;
        this._cors = null;
        this._cors = require('cors');
        this._express = require('express');
        this._app = this._express();
        this._bodyParser = require('body-parser');
        this._path = require('path');
        this._server = require('http').createServer(this._app);
        this._server.listen(process.env.PORT || 3000);
        this._app.use(this._bodyParser.urlencoded({ extended: true }));
        this._app.use(this._bodyParser.json());
        this._app.use(this._express.static(this._path.join(__dirname + './')));
        this._app.use(this._cors());
        // this._app.use('/model', ModelerApi);
        // this._app.use('/database', DatabaseApi);
        this._app.use('/mongo', MongoConfigApi);
        console.log("server listening on " + (process.env.PORT || 3000));
    }
    return Server;
}());
new Server();
//# sourceMappingURL=server.js.map