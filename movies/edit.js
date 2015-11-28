/**
 * Created by RSexton on 11/28/2015.
 */
import {inject} from "aurelia-framework";
import {MovieData} from "./movieData";

@inject(MovieData)
export class Edit {

    constructor(movieData) {
        this.data = movieData;
    }

    activate(params) {
        return this.data.getById(params.id)
                        .then(movie => this.movie = movie);
    }
}