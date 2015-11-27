import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class App {
    constructor(httpClient) {
        this.message = "";
        this.http = httpClient;
    }
    activate() {
        this.message = "Hello from Aurelia!";
        this.http.get('./movies.json')
            .then(response => {
                this.movies = response.content;
        });
    }
    changeMessage() {
        this.message = "Goodbye :)";
    }
}