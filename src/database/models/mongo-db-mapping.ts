import { MongoDbCollection } from './mongo-db-collection';

export class MongoDbMapping {
    public collection: MongoDbCollection;
    public fields: any[];
    constructor(mapping?) {
        if (mapping) {
            this.collection = new MongoDbCollection(mapping.collection);
            this.fields = mapping.fields || [];
        }
    }
}
