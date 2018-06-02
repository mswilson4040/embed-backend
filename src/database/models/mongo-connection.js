"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDBConnection = /** @class */ (function () {
    function MongoDBConnection(config) {
        if (config) {
            this.connectionString = config.connectionString;
            this.databaseName = config.databaseName;
            this.selectedCollections = config.selectedCollections;
        }
    }
    return MongoDBConnection;
}());
exports.MongoDBConnection = MongoDBConnection;
//# sourceMappingURL=mongo-connection.js.map