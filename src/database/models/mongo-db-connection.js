"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDbConnection = /** @class */ (function () {
    function MongoDbConnection(connection) {
        if (connection) {
            this.connectionString = connection.connectionString;
            this.databaseName = connection.databaseName;
        }
    }
    return MongoDbConnection;
}());
exports.MongoDbConnection = MongoDbConnection;
//# sourceMappingURL=mongo-db-connection.js.map