/**
 * Created by RSexton on 11/27/2015.
 */
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = 'movies.json';

@inject(HttpClient)
export class MovieData {

    constructor(httpClient) {
      this.http = httpClient;
    };

    getAll() {
        return this.http.get(baseUrl)
            .then(response => {
                return response.content;
            });
    };

    getById(id) {
        return this.http.get(baseUrl)
            .then(response => {
                var movie = { id: 1, title:"Star Wars", releaseYear: 1977};
                return movie;
            });
    };

}