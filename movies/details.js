/**
 * Created by RSexton on 11/27/2015.
 */
import {inject} from "aurelia-framework";
import {MovieData} from "./movieData";

@inject(MovieData)
export class Details {

    constructor(movieData) {
        this.data = movieData;
    }

    activate(params) {
        return this.data.getById(params.id)
                        .then(movie => this.movie = movie);
    }
}