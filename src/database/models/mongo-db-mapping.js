"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_db_collection_1 = require("./mongo-db-collection");
var MongoDbMapping = /** @class */ (function () {
    function MongoDbMapping(mapping) {
        if (mapping) {
            this.collection = new mongo_db_collection_1.MongoDbCollection(mapping.collection);
            this.fields = mapping.fields || [];
        }
    }
    return MongoDbMapping;
}());
exports.MongoDbMapping = MongoDbMapping;
//# sourceMappingURL=mongo-db-mapping.js.map