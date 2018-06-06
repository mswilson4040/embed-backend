export class MongoDbField {
    public name: string;
    public selected: boolean;
    constructor(field?) {
        if (field) {
            this.name = field.name;
            this.selected = field.selected;
        }
    }
}
