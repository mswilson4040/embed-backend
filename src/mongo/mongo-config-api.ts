import { MongoClient } from 'mongodb';
import { MongoDbConnection } from '../database/models/mongo-db-connection';
import { MongoDatabase } from '../database/models/mongo-database';
import { MongoDbConfiguration } from '../database/models/mongo-db-configuration';

export class MongoConfigApi {
    public express: any = null;
    public router: any = null;
    public mongodb: MongoClient = null;
    constructor() {
        this.express = require('express');
        this.router = this.express.Router();
        this.mongodb = require('mongodb').MongoClient;

        this.router.post('/databases', async (request, response) => {
            const connection = new MongoDbConnection(request.body);
            const databases = await this.getDatabases(connection);
            response.status(200).json(databases);
        });

        this.router.post('/databases/collections', async (request, response) => {
            const connection = new MongoDbConnection(request.body);
            const collections = await this.getCollections(connection);
            response.status(200).json(collections);
        });

        this.router.post('/databases/collections/fields', async (request, response) => {
            const connection = new MongoDbConnection(request.body.connection);
            const collectionName = request.body.collectionName;
            const fields = await this.getFieldsFromCollection(connection, collectionName);
            response.status(200).json(fields);
        });

        this.router.post('/save', async (request, response) => {
            const config = new MongoDbConfiguration(request.body);
            const savedConfig = await this.saveModel(config);
            response.status(200).json(savedConfig);
        });

        module.exports = this.router;
    }
    async connect(connection: MongoDbConnection): Promise<MongoClient> {
        const client = await MongoClient.connect(connection.connectionString);
        return client;
    }
    async saveModel(config: MongoDbConfiguration) {
        config.mappingId = `config_${new Date().getTime()}`;
        const client = await this.connect(config.getConnection());
        const db = client.db('embed');
        const collection = db.collection('mongo-configs');
        const res = await collection.updateOne(
            { mappingId: config.mappingId },
            { $set: config },
            { upsert: true});
        await client.close();
        const _config = await this.openModel(config.getConnection(), config.mappingId);
        return _config;
    }
    async getDatabases(connection: MongoDbConnection): Promise<MongoDatabase[]> {
        const client = await this.connect(connection);
        const docs = await client.db('test').admin().listDatabases();
        await client.close();
        return docs.databases.map( d => new MongoDatabase(d) );
    }
    async getCollections(connection: MongoDbConnection) {
        const client = await this.connect(connection);
        const docs = await client.db(connection.databaseName).listCollections().toArray();
        await client.close();
        return docs;
    }
    async getFieldsFromCollection(connection: MongoDbConnection, collectionName: string) {
        const client = await this.connect(connection);
        const db = client.db(connection.databaseName);
        const collection = db.collection(collectionName);
        const one = await collection.findOne({});
        client.close();
        return Object.keys(one);
    }
    async openModel(connection: MongoDbConnection, mappingId: string) {
        const client = await this.connect(connection);
        const collection = client.db(connection.databaseName).collection('mongo-configs');
        const config = await collection.find( { mappingId: mappingId }).toArray();
        return config;
    }
}

new MongoConfigApi();