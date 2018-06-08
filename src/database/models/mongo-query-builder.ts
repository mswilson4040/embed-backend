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
        const pipeline = [];
        for (let i = 0; i < this._config.mapping.length; i++) {
            const mapping = this._config.mapping[i];
            if (!mapping.collection.primary) {
                const lookup = {
                    $lookup: {
                        from: mapping.collection.name,
                        foreignField: mapping.foreignField,
                        localField: mapping.localField,
                        as: mapping.collection.name
                    }
                };
                const unwind = {
                    $unwind: `$${mapping.collection.name}`
                };
                const replaceRoot = {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [
                                {
                                    $arrayToObject: {
                                        $filter: {
                                            input: { $objectToArray: '$$ROOT' },
                                            cond: { $not: { $in: [ '$$this.k', [ '_id', mapping.collection.name, mapping.localField ] ] } }
                                        }
                                    }
                                },
                                `$${mapping.collection.name}`
                            ]
                        }
                    }
                };
                pipeline.push(lookup);
                pipeline.push(unwind);
                pipeline.push(replaceRoot);
            }
        }
        return pipeline;
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