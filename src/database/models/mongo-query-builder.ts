import { MongoDbConfiguration } from './mongo-db-configuration';

export class MongoQueryBuilder {
    private _config: MongoDbConfiguration;
    constructor(_config: MongoDbConfiguration) {
        this._config = _config;
    }
    getQuery() {
        // TODO: Run the check to see if you need just a regular query or an aggregate query
            // TODO: If you need aggregate, this.getAggregateQuery();
            // TODO: Else you just need to run the regular this.getFindQuery();
    }
    getAggregateQuery() {

    }
    getFindQuery() {

    }

}