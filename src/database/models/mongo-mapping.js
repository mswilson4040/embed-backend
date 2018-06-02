"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_connection_1 = require("./mongo-connection");
var MongoMapping = /** @class */ (function (_super) {
    __extends(MongoMapping, _super);
    function MongoMapping(_mongoDBConnection, mapping) {
        var _this = _super.call(this, _mongoDBConnection) || this;
        _this.view = [];
        if (mapping) {
            _this.view = mapping.view.map(function (v) { return new CollectionMapping(v); });
        }
        return _this;
    }
    MongoMapping.prototype.addMapping = function (mapping) {
        var match = this.view.find(function (v) { return v.name === mapping.collection; });
        if (match) {
            match.fields.push(mapping.field);
        }
        else {
            var colMapping = new CollectionMapping();
            colMapping.name = mapping.collection;
            colMapping.fields = [mapping.field];
            colMapping.primary = mapping.primary;
            colMapping.localField = mapping.localField;
            colMapping.foreignField = mapping.foreignField;
            this.view.push(colMapping);
        }
    };
    MongoMapping.prototype.getPrimaryCollection = function () {
        if (this.view.length === 0) {
            return null;
        }
        else {
            return this.view.find(function (c) { return c.primary; }) || null;
        }
    };
    MongoMapping.prototype.getDisplayColumns = function () {
        var columns = [];
        this.view.forEach(function (m) { columns = columns.concat(m.fields); });
        return columns;
    };
    MongoMapping.prototype.doesCollectionExist = function (collection) {
        var col = this.view.find(function (v) { return v.name === collection; });
        return col ? true : false;
    };
    return MongoMapping;
}(mongo_connection_1.MongoDBConnection));
exports.MongoMapping = MongoMapping;
var CollectionMapping = /** @class */ (function () {
    function CollectionMapping(mapping) {
        if (mapping) {
            this.name = mapping.name;
            this.primary = mapping.primary;
            this.fields = mapping.fields;
            this.localField = mapping.localField;
            this.foreignField = mapping.foreignField;
        }
    }
    return CollectionMapping;
}());
//# sourceMappingURL=mongo-mapping.js.map