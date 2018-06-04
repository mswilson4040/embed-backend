export class MongoDbCollection {
    public idIndex: { key: { _id: number }, name: string, ns: string, v: number };
    public info: { readOnly: boolean, uuid: string };
    public name: string;
    public options: {};
    public type: string;
    public primary: boolean;
    constructor(collection?) {
        if (collection) {
            this.idIndex = collection.idIndex;
            this.info = collection.info;
            this.name = collection.name;
            this.options = collection.options;
            this.type = collection.type;
            this.primary = collection.primary || false;
        }
    }
}
