/**
 * Created by RSexton on 11/29/2015.
 */
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = 'http://localhost/moviesApi/api/actors';

@inject(HttpClient)
export class ActorData {

    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        return this.http.get(baseUrl)
            .then(response => {
                return response.content;
            });
    }

    getById(id) {
        return this.http.get(`${baseUrl}/${id}`)
            .then(response => response.content);
    }

    save(id, movie) {
        return this.http.put(`${baseUrl}/${id}`, movie);
    }

}