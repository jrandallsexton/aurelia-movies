/**
 * Created by RSexton on 11/28/2015.
 */
import {inject} from "aurelia-framework";
import {MovieData} from "./movieData";
import {Router} from "aurelia-router";

@inject(MovieData, Router)
export class Edit {

    constructor(movieData, router) {
        this.data = movieData;
        this.router = router;
    }

    activate(params) {
        return this.data.getById(params.id)
                        .then(movie => this.movie = movie);
    }

    save() {
        // TODO: Determine why I had to use "this" in the route param
        this.data.save(this.movie.id, this.movie)
                 .then(movie => {
                     let url = this.router.generate("details", { id: this.movie.id });
                     this.router.navigate(url);
                 });
    }
}