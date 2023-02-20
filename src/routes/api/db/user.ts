import { ObjectId } from "mongodb";

export default class User {
    constructor(public email: string, public name: string, public password: string, public category: string, public id?: ObjectId) {}
}