export default class {
    _id?: string;
    name?: string;
    completed?: boolean;
    constructor(id: string, name: string, completed: boolean) {
        this._id = id;
        this.name = name;
        this.completed = completed;
    }
}