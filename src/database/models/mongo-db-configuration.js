"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_db_connection_1 = require("./mongo-db-connection");
var mongo_db_mapping_1 = require("./mongo-db-mapping");
var mongo_db_collection_1 = require("./mongo-db-collection");
var MongoDbConfiguration = /** @class */ (function () {
    function MongoDbConfiguration(config) {
        if (config) {
            this.databaseName = config.databaseName;
            this.mappingId = config.mappingId;
            this.mappingName = config.mappingName;
            this.mongoPath = config.mongoPath;
            this.mapping = config.mapping.map(function (m) { return new mongo_db_mapping_1.MongoDbMapping(m); });
        }
    }
    MongoDbConfiguration.prototype.getConnection = function () {
        var connection = new mongo_db_connection_1.MongoDbConnection();
        connection.connectionString = this.mongoPath;
        connection.databaseName = this.databaseName;
        return connection;
    };
    MongoDbConfiguration.prototype.addMapping = function (mapping) {
        this.mapping = this.mapping ? this.mapping : [];
        this.mapping.push(mapping);
    };
    MongoDbConfiguration.prototype.addCollectionToMapping = function (collection, fields) {
        var mapping = new mongo_db_mapping_1.MongoDbMapping();
        mapping.collection = new mongo_db_collection_1.MongoDbCollection(collection);
        mapping.fields = fields ? fields : [];
        this.addMapping(mapping);
    };
    return MongoDbConfiguration;
}());
exports.MongoDbConfiguration = MongoDbConfiguration;
//# sourceMappingURL=mongo-db-configuration.js.map