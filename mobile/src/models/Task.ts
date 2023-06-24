export default class {
    _id?: number;
    name?: string;
    completed?: boolean;
    constructor(id: number, name: string, completed: boolean) {
        this._id = id;
        this.name = name;
        this.completed = completed;
    }
}