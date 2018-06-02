export class MongoDbConnection {
    public connectionString: string;
    public databaseName: string;
    constructor(connection?) {
        if (connection) {
            this.connectionString = connection.connectionString;
            this.databaseName = connection.databaseName;
        }
    }
}
