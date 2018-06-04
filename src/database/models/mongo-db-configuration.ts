import { MongoDbConnection } from './mongo-db-connection';
import { MongoDbMapping } from './mongo-db-mapping';
import { MongoDbCollection } from './mongo-db-collection';

export class MongoDbConfiguration {
    public databaseName: string;
    public mappingName: string;
    public mappingId: string;
    public mongoPath: string; // = 'mongodb://localhost:27017';
    public mapping: MongoDbMapping[];

    constructor(config?) {
        if (config) {
            this.databaseName = config.databaseName;
            this.mappingId = config.mappingId;
            this.mappingName = config.mappingName;
            this.mongoPath = config.mongoPath;
            this.mapping = config.mapping.map( m => new MongoDbMapping(m) );
        }
    }
    getConnection(): MongoDbConnection {
        const connection = new MongoDbConnection();
        connection.connectionString = this.mongoPath;
        connection.databaseName = this.databaseName;
        return connection;
    }
    addMapping(mapping: MongoDbMapping) {
        this.mapping = this.mapping ? this.mapping : [];
        this.mapping.push(mapping);
    }
    addCollectionToMapping(collection: MongoDbCollection, fields) {
        const mapping = new MongoDbMapping();
        mapping.collection = new MongoDbCollection(collection);
        mapping.fields = fields ? fields : [];
        this.addMapping(mapping);
    }
}
