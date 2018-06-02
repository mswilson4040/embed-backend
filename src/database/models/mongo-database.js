"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDatabase = /** @class */ (function () {
    function MongoDatabase(database) {
        if (database) {
            this.name = database.name;
            this.sizeOnDisk = database.sizeOnDisk;
            this.empty = database.empty;
        }
    }
    return MongoDatabase;
}());
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=mongo-database.js.map