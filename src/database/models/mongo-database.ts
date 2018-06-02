export class MongoDatabase {
    public name: string;
    public sizeOnDisk: number;
    public empty: boolean;
    constructor(database?) {
        if (database) {
            this.name = database.name;
            this.sizeOnDisk = database.sizeOnDisk;
            this.empty = database.empty;
        }
    }
}