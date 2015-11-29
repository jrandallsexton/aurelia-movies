/**
 * Created by RSexton on 11/29/2015.
 */
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = 'http://localhost/authApi/api/accounts/users';

@inject(HttpClient)
export class UserData {

    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        return this.http.get(baseUrl)
            .then(response => {
                return response.content;
            });
    }

}