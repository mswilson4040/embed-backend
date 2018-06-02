"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var mongo_connection_1 = require("./models/mongo-connection");
var mongo_mapping_1 = require("./models/mongo-mapping");
var mongo_dbmapping_configuration_1 = require("./models/mongo-dbmapping-configuration");
var DatabaseApi = /** @class */ (function () {
    function DatabaseApi() {
        var _this = this;
        this.express = null;
        this.router = null;
        this.mongodb = null;
        this.express = require('express');
        this.router = this.express.Router();
        this.mongodb = require('mongodb').MongoClient;
        this.router.post('/connection/test', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var config, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = new mongo_connection_1.MongoDBConnection(request.body);
                        return [4 /*yield*/, this.connect(config)];
                    case 1:
                        client = _a.sent();
                        if (client instanceof mongodb_1.MongoClient) {
                            return [2 /*return*/, response.status(200).json(true)];
                        }
                        else {
                            return [2 /*return*/, response.status(500).json(client)];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/databases', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var mapping, databases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapping = new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration(request.body);
                        return [4 /*yield*/, this.getDatabases(mapping)];
                    case 1:
                        databases = _a.sent();
                        return [2 /*return*/, response.status(200).json(databases)];
                }
            });
        }); });
        this.router.post('/databases/collections', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var mapping, collections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapping = new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration(request.body);
                        return [4 /*yield*/, this.getCollections(mapping)];
                    case 1:
                        collections = _a.sent();
                        return [2 /*return*/, response.status(200).json(collections)];
                }
            });
        }); });
        this.router.post('/databases/collections/bulkinfo', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var mapping, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapping = new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration(request.body);
                        return [4 /*yield*/, this.getBulkCollectionInfo(mapping)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, response.status(200).json(info)];
                }
            });
        }); });
        this.router.post('/query', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var config, mapping, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = new mongo_connection_1.MongoDBConnection(request.body.config);
                        mapping = new mongo_mapping_1.MongoMapping(config, request.body.mapping);
                        return [4 /*yield*/, this.query(config, mapping)];
                    case 1:
                        data = _a.sent();
                        response.status(200).json(data);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/mappings/save', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var mapping, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapping = new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration(request.body);
                        return [4 /*yield*/, this.save(mapping)];
                    case 1:
                        success = _a.sent();
                        response.status(200).json(success);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.get('/mappings', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var mappings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMappings()];
                    case 1:
                        mappings = _a.sent();
                        response.status(200).json(mappings);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.get('/mapping/:mappingId', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var id, mapping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.mappingId;
                        return [4 /*yield*/, this.getMapping(id)];
                    case 1:
                        mapping = _a.sent();
                        response.status(200).json(mapping);
                        return [2 /*return*/];
                }
            });
        }); });
        module.exports = this.router;
    }
    DatabaseApi.prototype.connect = function (mapping) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        mongodb_1.MongoClient.connect(mapping.connectionString, function (_err, _client) {
                            if (_err) {
                                reject(_err);
                            }
                            else {
                                resolve(_client);
                            }
                        });
                    })];
            });
        });
    };
    DatabaseApi.prototype.getDatabases = function (mapping) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(mapping)];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                client.db('test').admin().listDatabases(function (_err, _databases) {
                                    if (_err) {
                                        reject(_err);
                                        client.close();
                                    }
                                    else {
                                        resolve(_databases.databases);
                                    }
                                });
                            })];
                }
            });
        });
    };
    DatabaseApi.prototype.getCollections = function (mapping) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.connect(mapping).then(function (_client) {
                            _client.db(mapping.databaseName).listCollections().toArray(function (err, collections) {
                                if (err) {
                                    reject(err);
                                    _client.close();
                                }
                                else {
                                    resolve(collections);
                                    _client.close();
                                }
                            });
                        }, function (error) {
                            reject(error);
                        });
                    })];
            });
        });
    };
    DatabaseApi.prototype.getBulkCollectionInfo = function (mapping) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        var client, db, promises;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.connect(mapping)];
                                case 1:
                                    client = _a.sent();
                                    db = client.db(mapping.databaseName);
                                    promises = [];
                                    mapping.mapping.forEach(function (col) {
                                        promises.push(_this.getCollectionInfo(mapping, col.collectionName));
                                    });
                                    Promise.all(promises).then(function (info) {
                                        resolve(info);
                                        client.close();
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DatabaseApi.prototype.getCollectionInfo = function (mapping, collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collection, one;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(mapping)];
                    case 1:
                        client = _a.sent();
                        db = client.db(mapping.databaseName);
                        collection = db.collection(collectionName);
                        return [4 /*yield*/, collection.findOne({})];
                    case 2:
                        one = _a.sent();
                        client.close();
                        return [2 /*return*/, { collection: collectionName, fields: Object.keys(one) }];
                }
            });
        });
    };
    DatabaseApi.prototype.query = function (config, mapping) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var client, db, primaryCollection, fields, i, f, lookups;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.connect(config)];
                                case 1:
                                    client = _a.sent();
                                    db = client.db(config.databaseName);
                                    primaryCollection = mapping.getPrimaryCollection();
                                    if (mapping.view.length === 1) {
                                        fields = {};
                                        for (i = 0; i < primaryCollection.fields.length; i++) {
                                            f = primaryCollection.fields[i];
                                            fields[f] = 1;
                                        }
                                        db.collection(primaryCollection.name).find({}, { projection: fields }).limit(25).toArray(function (err, data) {
                                            resolve(data);
                                            client.close();
                                        });
                                    }
                                    else {
                                        lookups = this.buildAggregates(mapping);
                                        db.collection(primaryCollection.name).aggregate(lookups).limit(25).toArray(function (err, data) {
                                            resolve(data);
                                            client.close();
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DatabaseApi.prototype.save = function (mapping) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collection, res, _mapping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(mapping)];
                    case 1:
                        client = _a.sent();
                        db = client.db('embed');
                        collection = db.collection('mongo-configs');
                        return [4 /*yield*/, collection.updateOne({ mappingId: mapping.mappingId }, { $set: mapping }, { upsert: true })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        if (!res) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getMapping(mapping.mappingId)];
                    case 4:
                        _mapping = _a.sent();
                        return [2 /*return*/, _mapping];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    DatabaseApi.prototype.getMappings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fakeMapping, client, db, collection, configs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeMapping = new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration();
                        fakeMapping.connectionString = 'mongodb://localhost:27017';
                        return [4 /*yield*/, this.connect(fakeMapping)];
                    case 1:
                        client = _a.sent();
                        db = client.db('embed');
                        collection = db.collection('mongo-configs');
                        return [4 /*yield*/, collection.find({}).toArray()];
                    case 2:
                        configs = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, configs.map(function (c) { return new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration(c); })];
                }
            });
        });
    };
    DatabaseApi.prototype.getMapping = function (mappingId) {
        return __awaiter(this, void 0, void 0, function () {
            var fakeMapping, client, db, collection, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fakeMapping = new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration();
                        fakeMapping.connectionString = 'mongodb://localhost:27017';
                        return [4 /*yield*/, this.connect(fakeMapping)];
                    case 1:
                        client = _a.sent();
                        db = client.db('embed');
                        collection = db.collection('mongo-configs');
                        return [4 /*yield*/, collection.findOne({ mappingId: mappingId })];
                    case 2:
                        config = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new mongo_dbmapping_configuration_1.MongoDBMappingConfiguration(config)];
                }
            });
        });
    };
    DatabaseApi.prototype.buildAggregates = function (mapping) {
        var lookups = [];
        for (var i = 0; i < mapping.view.length; i++) {
            var collection = mapping.view[i];
            if (!collection.primary) {
                var lookup = {
                    $lookup: {
                        from: collection.name,
                        localField: collection.localField,
                        foreignField: collection.foreignField,
                        as: collection.name
                    }
                };
                var unwind = {
                    $unwind: "$" + collection.name
                };
                var replaceRoot = {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [
                                {
                                    $arrayToObject: {
                                        $filter: {
                                            input: { $objectToArray: '$$ROOT' },
                                            cond: { $not: { $in: ['$$this.k', ['_id', collection.name, collection.localField]] } }
                                        }
                                    }
                                },
                                "$" + collection.name
                            ]
                        }
                    }
                };
                lookups.push(lookup);
                lookups.push(unwind);
                lookups.push(replaceRoot);
                // lookups.push({$out: 'Collection 3'});
            }
        }
        // lookups.push({$out: 'Collection 3'});
        return lookups;
    };
    return DatabaseApi;
}());
exports.DatabaseApi = DatabaseApi;
new DatabaseApi();
//# sourceMappingURL=databaseApi.js.map