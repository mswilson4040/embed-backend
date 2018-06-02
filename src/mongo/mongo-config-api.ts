import { MongoClient } from 'mongodb';
import { MongoDbConnection } from '../database/models/mongo-db-connection';
import { MongoDatabase } from '../database/models/mongo-database';

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


        module.exports = this.router;
    }
    async connect(connection: MongoDbConnection): Promise<MongoClient> {
        const client = await MongoClient.connect(connection.connectionString);
        return client;
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
}

new MongoConfigApi();