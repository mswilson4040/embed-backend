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
var mongo_db_connection_1 = require("../database/models/mongo-db-connection");
var mongo_database_1 = require("../database/models/mongo-database");
var mongo_db_configuration_1 = require("../database/models/mongo-db-configuration");
var MongoConfigApi = /** @class */ (function () {
    function MongoConfigApi() {
        var _this = this;
        this.express = null;
        this.router = null;
        this.mongodb = null;
        this.express = require('express');
        this.router = this.express.Router();
        this.mongodb = require('mongodb').MongoClient;
        this.router.post('/databases', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var connection, databases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new mongo_db_connection_1.MongoDbConnection(request.body);
                        return [4 /*yield*/, this.getDatabases(connection)];
                    case 1:
                        databases = _a.sent();
                        response.status(200).json(databases);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/databases/collections', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var connection, collections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new mongo_db_connection_1.MongoDbConnection(request.body);
                        return [4 /*yield*/, this.getCollections(connection)];
                    case 1:
                        collections = _a.sent();
                        response.status(200).json(collections);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/databases/collections/fields', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var connection, collectionName, fields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new mongo_db_connection_1.MongoDbConnection(request.body.connection);
                        collectionName = request.body.collectionName;
                        return [4 /*yield*/, this.getFieldsFromCollection(connection, collectionName)];
                    case 1:
                        fields = _a.sent();
                        response.status(200).json(fields);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/save', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var config, savedConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = new mongo_db_configuration_1.MongoDbConfiguration(request.body);
                        return [4 /*yield*/, this.saveModel(config)];
                    case 1:
                        savedConfig = _a.sent();
                        response.status(200).json(savedConfig);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/open', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var connection, mappingId, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new mongo_db_connection_1.MongoDbConnection(request.body.connection);
                        mappingId = request.body.mappingId;
                        return [4 /*yield*/, this.openModel(connection, mappingId)];
                    case 1:
                        config = _a.sent();
                        response.status(200).json(config);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/configs', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var connection, configs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = new mongo_db_connection_1.MongoDbConnection(request.body);
                        return [4 /*yield*/, this.getConfigs(connection)];
                    case 1:
                        configs = _a.sent();
                        response.status(200).json(configs);
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.post('/delete', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            var config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = new mongo_db_configuration_1.MongoDbConfiguration(request.body);
                        return [4 /*yield*/, this.deleteModel(config)];
                    case 1:
                        result = _a.sent();
                        response.status(200).json(result);
                        return [2 /*return*/];
                }
            });
        }); });
        module.exports = this.router;
    }
    MongoConfigApi.prototype.connect = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(connection.connectionString)];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    MongoConfigApi.prototype.saveModel = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collection, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config.mappingId = config.mappingId ? config.mappingId : "config_" + new Date().getTime();
                        return [4 /*yield*/, this.connect(config.getConnection())];
                    case 1:
                        client = _a.sent();
                        db = client.db('embed');
                        collection = db.collection('mongo-configs');
                        return [4 /*yield*/, collection.updateOne({ mappingId: config.mappingId }, { $set: config }, { upsert: true })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.openModel(config.getConnection(), config.mappingId)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoConfigApi.prototype.getDatabases = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var client, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(connection)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db('test').admin().listDatabases()];
                    case 2:
                        docs = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, docs.databases.map(function (d) { return new mongo_database_1.MongoDatabase(d); })];
                }
            });
        });
    };
    MongoConfigApi.prototype.getCollections = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var client, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(connection)];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.db(connection.databaseName).listCollections().toArray()];
                    case 2:
                        docs = _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoConfigApi.prototype.getFieldsFromCollection = function (connection, collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collection, one;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(connection)];
                    case 1:
                        client = _a.sent();
                        db = client.db(connection.databaseName);
                        collection = db.collection(collectionName);
                        return [4 /*yield*/, collection.findOne({})];
                    case 2:
                        one = _a.sent();
                        client.close();
                        return [2 /*return*/, Object.keys(one)];
                }
            });
        });
    };
    MongoConfigApi.prototype.openModel = function (connection, mappingId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, collection, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(connection)];
                    case 1:
                        client = _a.sent();
                        collection = client.db('embed').collection('mongo-configs');
                        return [4 /*yield*/, collection.findOne({ mappingId: mappingId })];
                    case 2:
                        config = _a.sent();
                        return [2 /*return*/, new mongo_db_configuration_1.MongoDbConfiguration(config)];
                }
            });
        });
    };
    MongoConfigApi.prototype.getConfigs = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var client, collection, configs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(connection)];
                    case 1:
                        client = _a.sent();
                        collection = client.db('embed').collection('mongo-configs');
                        return [4 /*yield*/, collection.find({}).toArray()];
                    case 2:
                        configs = _a.sent();
                        return [2 /*return*/, configs.map(function (c) { return new mongo_db_configuration_1.MongoDbConfiguration(c); })];
                }
            });
        });
    };
    MongoConfigApi.prototype.deleteModel = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var client, collection, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect(config.getConnection())];
                    case 1:
                        client = _a.sent();
                        collection = client.db('embed').collection('mongo-configs');
                        return [4 /*yield*/, collection.deleteOne({ mappingId: config.mappingId })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.deletedCount === 1];
                }
            });
        });
    };
    return MongoConfigApi;
}());
exports.MongoConfigApi = MongoConfigApi;
new MongoConfigApi();
//# sourceMappingURL=mongo-config-api.js.map