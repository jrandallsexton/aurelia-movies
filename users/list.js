/**
 * Created by RSexton on 11/29/2015.
 */
import {inject} from "aurelia-framework";
import {UserData} from "./userData";

@inject(UserData)
export class List {
    constructor(userData) {
        this.userData = userData;
    }
    activate() {
        return this.userData
            .getAll()
            .then(users => this.users = users);
    }
}