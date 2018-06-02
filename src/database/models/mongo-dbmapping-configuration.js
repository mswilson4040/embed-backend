"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDBMappingConfiguration = /** @class */ (function () {
    function MongoDBMappingConfiguration(config) {
        var _this = this;
        if (config) {
            this.mappingName = config.mappingName;
            this.connectionString = config.connectionString;
            this.databaseName = config.databaseName;
            this.mappingId = config.mappingId;
            if (config.mapping) {
                config.mapping.forEach(function (m) { return _this.addMapping(new MongoDBCollectionMapping(m)); });
            }
        }
        else {
            this.mappingId = this.generateId();
        }
    }
    MongoDBMappingConfiguration.prototype.addMapping = function (mapping) {
        this.mapping = this.mapping ? this.mapping : [];
        var matchedCollection = this.doesMappingExist(mapping);
        if (!matchedCollection) {
            this.mapping.push(mapping);
        }
        else {
            matchedCollection.primary = mapping.primary;
            mapping.fields.forEach(function (f) {
                matchedCollection.addField(f);
            });
        }
    };
    MongoDBMappingConfiguration.prototype.doesMappingExist = function (mapping) {
        if (this.mapping) {
            var match = this.mapping.find(function (c) { return c.collectionName === mapping.collectionName; });
            return match ? match : null;
        }
        else {
            return null;
        }
    };
    MongoDBMappingConfiguration.prototype.generateId = function () {
        var now = new Date().getTime();
        return "mapping_" + now;
    };
    MongoDBMappingConfiguration.prototype.getPrimaryCollection = function () {
        if (this.mapping && this.mapping.length > 0) {
            return this.mapping.find(function (m) { return m.primary; });
        }
        else {
            return null;
        }
    };
    return MongoDBMappingConfiguration;
}());
exports.MongoDBMappingConfiguration = MongoDBMappingConfiguration;
var MongoDBCollectionMapping = /** @class */ (function () {
    function MongoDBCollectionMapping(mapping) {
        var _this = this;
        if (mapping) {
            this.collectionName = mapping.collectionName;
            this.primary = mapping.primary ? true : false;
            if (mapping.fields) {
                mapping.fields.forEach(function (f) { return _this.addField(f); });
            }
            else {
                this.fields = [];
            }
        }
    }
    MongoDBCollectionMapping.prototype.addField = function (field) {
        this.fields = this.fields ? this.fields : [];
        var match = this.fields.find(function (f) { return f.name === field.name; });
        if (!match) {
            this.fields.push(field);
        }
    };
    return MongoDBCollectionMapping;
}());
exports.MongoDBCollectionMapping = MongoDBCollectionMapping;
var MongoDBField = /** @class */ (function () {
    function MongoDBField(field) {
        if (field) {
            this.name = field.name;
            this.selected = field.selected;
        }
    }
    return MongoDBField;
}());
exports.MongoDBField = MongoDBField;
//# sourceMappingURL=mongo-dbmapping-configuration.js.map