import { MongoDbCollection } from './mongo-db-collection';
import { MongoDbField } from './mongo-db-field';

export class MongoDbMapping {
    public collection: MongoDbCollection;
    public fields: MongoDbField[];
    constructor(mapping?) {
        if (mapping) {
            this.collection = new MongoDbCollection(mapping.collection);
            this.fields = mapping.fields || [];
        }
    }
    hasFieldsSelected(): boolean {
        const fields = this.fields.filter( f => f.selected );
        return fields && fields.length > 0 ? true : false;
    }
}
