/**
 * Created by RSexton on 11/28/2015.
 */
import {inject} from "aurelia-framework";
import {MovieData} from "./movieData";
import {Router} from "aurelia-router";
import {Validation} from "aurelia-validation";

@inject(MovieData, Router, Validation)
export class Edit {

    constructor(movieData, router, validation) {
        this.data = movieData;
        this.router = router;
        this.validation = validation.on(this)
            .ensure("movie.title")
                .isNotEmpty()
                .hasMinLength(2)
                .hasMaxLength(100)
            .ensure("movie.releaseYear")
                .isNotEmpty()
                .isNumber()
                .isBetween(1900, 2100);
    }

    activate(params) {
        return this.data.getById(params.id)
                        .then(movie => {
                            this.movie = movie;
                            this.validation.validate();
                        });
    }

    save() {
        this.validation.validate().then(() => {
            this.data.save(this.movie.id, this.movie)
                     .then(movie => {
                         // TODO: Determine why I had to use "this" in the route param
                         let url = this.router.generate("details", { id: this.movie.id });
                         this.router.navigate(url);
                     });
        });
    }
}