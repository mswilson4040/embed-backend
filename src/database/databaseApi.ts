// import { MongoClient, MongoClientOptions } from 'mongodb';
// import { MongoDBConnection } from './models/mongo-connection';
// import { MongoMapping } from './models/mongo-mapping';
// import { MongoDBMappingConfiguration } from './models/mongo-dbmapping-configuration';
//
// export class DatabaseApi {
//     public express: any = null;
//     public router: any = null;
//     public mongodb: MongoClient = null;
//     constructor() {
//         this.express = require('express');
//         this.router = this.express.Router();
//         this.mongodb = require('mongodb').MongoClient;
//
//
//         this.router.post('/connection/test', async (request, response) => {
//             const config = new MongoDBConnection(request.body);
//             const client = await this.connect(config);
//             if (client instanceof MongoClient) {
//                 return response.status(200).json(true);
//             } else {
//                 return response.status(500).json(client);
//             }
//         });
//         this.router.post('/databases', async (request, response) => {
//             const mapping = new MongoDBMappingConfiguration(request.body);
//             const databases = await this.getDatabases(mapping);
//             return response.status(200).json(databases);
//         });
//         this.router.post('/databases/collections', async (request, response) => {
//             const mapping = new MongoDBMappingConfiguration(request.body);
//             const collections = await this.getCollections(mapping);
//             return response.status(200).json(collections);
//         });
//         this.router.post('/databases/collections/bulkinfo', async (request, response) => {
//            const mapping = new MongoDBMappingConfiguration(request.body);
//            const info = await this.getBulkCollectionInfo(mapping);
//            return response.status(200).json(info);
//         });
//         this.router.post('/query', async (request, response) => {
//             const config = new MongoDBConnection(request.body.config);
//             const mapping = new MongoMapping(config, request.body.mapping);
//             const data = await this.query(config, mapping);
//             response.status(200).json(data);
//         });
//         this.router.post('/mappings/save', async (request, response) => {
//             const mapping = new MongoDBMappingConfiguration(request.body);
//             const success = await this.save(mapping);
//             response.status(200).json(success);
//         });
//         this.router.get('/mappings', async (request, response) => {
//             const mappings = await this.getMappings();
//             response.status(200).json(mappings);
//         });
//         this.router.get('/mapping/:mappingId', async (request, response) => {
//             const id = request.params.mappingId;
//             const mapping = await this.getMapping(id);
//             response.status(200).json(mapping);
//         });
//         module.exports = this.router;
//     }
//
//     async connect(mapping: MongoDBMappingConfiguration): Promise<MongoClient> {
//         return new Promise<MongoClient>( (resolve, reject) => {
//             MongoClient.connect(mapping.connectionString, (_err, _client: MongoClient) => {
//                 if (_err) {
//                     reject(_err);
//                 } else {
//                     resolve(_client);
//                 }
//             });
//         });
//     }
//     async getDatabases(mapping: MongoDBMappingConfiguration) {
//         const client: MongoClient = await this.connect(mapping);
//         return new Promise( (resolve, reject) => {
//             client.db('test').admin().listDatabases( (_err, _databases) => {
//                 if (_err) {
//                     reject(_err);
//                     client.close();
//                 } else {
//                     resolve(_databases.databases);
//                 }
//             })
//         });
//     }
//     async getCollections(mapping: MongoDBMappingConfiguration) {
//         return new Promise( (resolve, reject) => {
//             this.connect(mapping).then( (_client: any) => {
//                 _client.db(mapping.databaseName).listCollections().toArray( (err, collections) => {
//                     if (err) {
//                         reject(err);
//                         _client.close();
//                     } else {
//                         resolve(collections);
//                         _client.close();
//                     }
//                 });
//             }, error => {
//                 reject(error);
//             });
//         });
//     }
//     async getBulkCollectionInfo(mapping: MongoDBMappingConfiguration) {
//         return new Promise( async (resolve, reject) => {
//             const client: MongoClient = await this.connect(mapping);
//             const db = client.db(mapping.databaseName);
//             const promises = [];
//             mapping.mapping.forEach( col => {
//                 promises.push(this.getCollectionInfo(mapping, col.collectionName));
//             });
//             Promise.all(promises).then( info => {
//                 resolve(info);
//                 client.close();
//             });
//
//         });
//     }
//     async getCollectionInfo(mapping: MongoDBMappingConfiguration, collectionName: string) {
//         const client: MongoClient = await this.connect(mapping);
//         const db = client.db(mapping.databaseName);
//         const collection = db.collection(collectionName);
//         const one = await collection.findOne({});
//         client.close();
//         return { collection: collectionName, fields: Object.keys(one) };
//     }
//     async query(config: MongoDBConnection, mapping: MongoMapping) {
//         return new Promise( async (resolve, reject) => {
//             const client: MongoClient = await this.connect(config);
//             const db = client.db(config.databaseName);
//             const primaryCollection = mapping.getPrimaryCollection();
//             if (mapping.view.length === 1) {
//                 const fields = {};
//                 for (let i = 0; i < primaryCollection.fields.length; i++) {
//                     const f = primaryCollection.fields[i];
//                     fields[f] = 1;
//                 }
//                 db.collection(primaryCollection.name).find( {}, { projection: fields }).limit(25).toArray( (err, data) => {
//                     resolve(data);
//                     client.close();
//                 });
//             } else {
//                 const lookups = this.buildAggregates(mapping);
//                 db.collection(primaryCollection.name).aggregate(lookups).limit(25).toArray( (err, data) => {
//                     resolve(data);
//                     client.close();
//                 })
//             }
//
//         });
//
//     }
//     async save(mapping: MongoDBMappingConfiguration) {
//         const client = await this.connect(mapping);
//         const db = client.db('embed');
//         const collection = db.collection('mongo-configs');
//         const res = await collection.updateOne(
//             { mappingId: mapping.mappingId },
//             { $set: mapping },
//             { upsert: true});
//         await client.close();
//         if (res) {
//             const _mapping = await this.getMapping(mapping.mappingId);
//             return _mapping;
//         } else {
//             return false;
//         }
//     }
//     async getMappings(): Promise<MongoDBMappingConfiguration[]> {
//         const fakeMapping = new MongoDBMappingConfiguration();
//         fakeMapping.connectionString = 'mongodb://localhost:27017';
//         const client = await this.connect(fakeMapping);
//         const db = client.db('embed');
//         const collection = db.collection('mongo-configs');
//         const configs = await collection.find({}).toArray();
//         await client.close();
//         return configs.map( c => new MongoDBMappingConfiguration(c));
//     }
//     async getMapping(mappingId: string): Promise<MongoDBMappingConfiguration> {
//         const fakeMapping = new MongoDBMappingConfiguration();
//         fakeMapping.connectionString = 'mongodb://localhost:27017';
//         const client = await this.connect(fakeMapping);
//         const db = client.db('embed');
//         const collection = db.collection('mongo-configs');
//         const config = await collection.findOne({ mappingId: mappingId });
//         await client.close();
//         return new MongoDBMappingConfiguration(config);
//     }
//     buildAggregates(mapping: MongoMapping) {
//         const lookups = [];
//         for (let i = 0; i < mapping.view.length; i++) {
//             const collection = mapping.view[i];
//             if (!collection.primary) {
//
//                 const lookup = {
//                     $lookup: {
//                         from: collection.name,
//                         localField: collection.localField,
//                         foreignField: collection.foreignField,
//                         as: collection.name
//                     }
//                 };
//                 const unwind = {
//                     $unwind: `$${collection.name}`
//                 };
//                 const replaceRoot = {
//                     $replaceRoot: {
//                         newRoot: {
//                             $mergeObjects: [
//                                 {
//                                     $arrayToObject: {
//                                         $filter: {
//                                             input: { $objectToArray: '$$ROOT' },
//                                             cond: { $not: { $in: [ '$$this.k', [ '_id', collection.name, collection.localField ]]}}
//                                         }
//                                     }
//                                 },
//                                 `$${collection.name}`
//                             ]
//                         }
//                     }
//                 };
//                 lookups.push(lookup);
//                 lookups.push(unwind);
//                 lookups.push(replaceRoot);
//                 // lookups.push({$out: 'Collection 3'});
//             }
//         }
//         // lookups.push({$out: 'Collection 3'});
//         return lookups;
//     }
// }
//
// new DatabaseApi();
