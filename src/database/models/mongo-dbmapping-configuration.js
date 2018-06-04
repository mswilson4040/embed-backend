// export class MongoDBMappingConfiguration {
//     public mappingName: string;
//     public connectionString: string;
//     public databaseName: string;
//     public mapping: MongoDBCollectionMapping[];
//     public mappingId: string;
//     constructor(config?) {
//         if (config) {
//             this.mappingName = config.mappingName;
//             this.connectionString = config.connectionString;
//             this.databaseName = config.databaseName;
//             this.mappingId = config.mappingId;
//             if (config.mapping) {
//                 config.mapping.forEach( m => this.addMapping(new MongoDBCollectionMapping(m)));
//             }
//         } else {
//             this.mappingId = this.generateId();
//         }
//     }
//     addMapping(mapping: MongoDBCollectionMapping) {
//         this.mapping = this.mapping ? this.mapping : [];
//         const matchedCollection = this.doesMappingExist(mapping);
//         if (!matchedCollection) {
//             this.mapping.push(mapping);
//         } else {
//             matchedCollection.primary = mapping.primary;
//             mapping.fields.forEach( f => {
//                 matchedCollection.addField(f);
//             });
//         }
//     }
//     doesMappingExist(mapping: MongoDBCollectionMapping): MongoDBCollectionMapping {
//         if (this.mapping) {
//             const match = this.mapping.find( c => c.collectionName === mapping.collectionName );
//             return match ? match : null;
//         } else {
//             return null;
//         }
//     }
//     generateId(): string {
//         const now = new Date().getTime();
//         return `mapping_${now}`;
//     }
//     getPrimaryCollection(): MongoDBCollectionMapping {
//         if (this.mapping && this.mapping.length > 0) {
//             return this.mapping.find( m => m.primary );
//         } else {
//             return null;
//         }
//     }
// }
//
// export class MongoDBCollectionMapping {
//     public collectionName: string;
//     public primary: boolean;
//     public fields: MongoDBField[];
//     constructor(mapping?) {
//         if (mapping) {
//             this.collectionName = mapping.collectionName;
//             this.primary = mapping.primary ? true : false;
//             if (mapping.fields) {
//                 mapping.fields.forEach( f => this.addField(f) );
//             } else {
//                 this.fields = [];
//             }
//         }
//     }
//     addField(field: MongoDBField) {
//         this.fields = this.fields ? this.fields : [];
//         const match = this.fields.find( f => f.name === field.name );
//         if (!match) {
//             this.fields.push(field);
//         }
//     }
// }
//
// export class MongoDBField {
//     public name: string;
//     public selected: boolean;
//     constructor(field?) {
//         if (field) {
//             this.name = field.name;
//             this.selected = field.selected;
//         }
//     }
// }
//# sourceMappingURL=mongo-dbmapping-configuration.js.map