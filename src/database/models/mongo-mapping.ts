// import { MongoDBConnection } from './mongo-connection';
//
// export class MongoMapping extends MongoDBConnection {
//     public view: CollectionMapping[] = [];
//     constructor(_mongoDBConnection: MongoDBConnection, mapping?) {
//         super(_mongoDBConnection);
//         if (mapping) {
//             this.view = mapping.view.map( v => new CollectionMapping(v));
//         }
//     }
//     addMapping(mapping: { collection: string, field: string, primary: boolean, localField: string, foreignField: string }) {
//         const match = this.view.find( v => v.name === mapping.collection );
//         if (match) {
//             match.fields.push(mapping.field);
//         } else {
//             const colMapping = new CollectionMapping();
//             colMapping.name = mapping.collection;
//             colMapping.fields = [mapping.field];
//             colMapping.primary = mapping.primary;
//             colMapping.localField = mapping.localField;
//             colMapping.foreignField = mapping.foreignField;
//             this.view.push( colMapping );
//         }
//     }
//     getPrimaryCollection(): CollectionMapping {
//         if (this.view.length === 0) {
//             return null;
//         } else {
//             return this.view.find( c => c.primary ) || null;
//         }
//     }
//     getDisplayColumns(): string[] {
//         let columns = [];
//         this.view.forEach( m => { columns = columns.concat(m.fields); });
//         return columns;
//     }
//     doesCollectionExist(collection: string): boolean {
//         const col = this.view.find( v => v.name === collection);
//         return col ? true : false;
//     }
// }
//
// class CollectionMapping {
//     public name: string;
//     public primary: boolean;
//     public fields: string[];
//     public localField: string;
//     public foreignField: string;
//     constructor(mapping?) {
//         if (mapping) {
//             this.name = mapping.name;
//             this.primary = mapping.primary;
//             this.fields = mapping.fields;
//             this.localField = mapping.localField;
//             this.foreignField = mapping.foreignField;
//         }
//     }
// }
