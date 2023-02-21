import { ObjectId } from "mongodb";

export default class User {
    constructor(public email: string, public name: string, public password: string, public category: string, public id?: ObjectId) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.category = category;
        this.id = id;
    }
}