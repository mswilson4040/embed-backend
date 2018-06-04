"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDbCollection = /** @class */ (function () {
    function MongoDbCollection(collection) {
        if (collection) {
            this.idIndex = collection.idIndex;
            this.info = collection.info;
            this.name = collection.name;
            this.options = collection.options;
            this.type = collection.type;
            this.primary = collection.primary || false;
        }
    }
    return MongoDbCollection;
}());
exports.MongoDbCollection = MongoDbCollection;
//# sourceMappingURL=mongo-db-collection.js.map