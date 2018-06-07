import { MongoDbConfiguration } from './mongo-db-configuration';
import { MongoDbMapping } from './mongo-db-mapping';
import { MongoDbField } from './mongo-db-field';

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
    getAggregates() {
        return [];
    }
    getSelectedMappings(): MongoDbMapping[] {
        return this._config.mapping.filter( m => m.hasFieldsSelected() );
    }
    getProjectedFields(mapping: MongoDbMapping) {
        const fields = {};
        let fieldCount: number = 0;
        for (let i = 0; i < mapping.fields.length; i++) {
            const field: MongoDbField = mapping.fields[i];
            if (field.selected) {
                fields[field.name] = 1;
                fieldCount++;
            }
        }
        return fieldCount > 0 ? fields : null;
    }

}