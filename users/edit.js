/**
 * Created by RSexton on 11/29/2015.
 */
import {inject} from "aurelia-framework";
import {UserData} from "./userData";
import {Router} from "aurelia-router";
import {Validation} from "aurelia-validation";

@inject(UserData, Router, Validation)
export class Edit {

    constructor(userData, router, validation) {
        this.data = userData;
        this.router = router;
        this.validation = validation.on(this)
            .ensure("user.userName")
            .isNotEmpty()
            .hasMinLength(2)
            .hasMaxLength(25)
            .ensure("user.email")
            .isNotEmpty();
    }

    activate(params) {
        return this.data.getById(params.id)
            .then(user => {
                this.user = user;
                this.validation.validate();
            });
    }

    save() {
        this.validation.validate().then(() => {
            this.data.save(this.user.id, this.user)
                .then(user => {
                    // TODO: Determine why I had to use "this" in the route param
                    let url = this.router.generate("details", { id: this.user.id });
                    this.router.navigate(url);
                });
        });
    }
}