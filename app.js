
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';

@inject(Router,FetchConfig)
export class App {

    constructor(router, fetchConfig){
        this.router = router;
        this.fetchConfig = fetchConfig;
    }

    configureRouter(config, router) {
        this.router = router;
        config.map([
            { route: ["", "list"],          moduleId: "movies/list",    title: "List",      nav: true,  name: "home" },
            { route: "about",               moduleId: "about/about",    title: "About",     nav: true,  name: "about" },
            { route: "movies/details/:id",  moduleId: "movies/details",                                 name: "movieDetails" },
            { route: "movies/edit/:id",     moduleId: "movies/edit",                                    name: "movieEdit" },
            { route: "create",              moduleId: "movies/edit",                                    name: "movieCreate" },
            { route: "actors/list",         moduleId: "actors/list",    title: "Actors",    nav: true,  name: "actorsList" },
            { route: "users/list",          moduleId: "users/list",     title: "Users",     nav: true,  name: "usersList" },
            { route: "users/edit/:id",      moduleId: "users/edit",                                     name: "userEdit" },
            { route: "details/:id",         moduleId: "users/details",                                  name: "userDetails" },
            { route: 'login',               moduleId: './login',        title:"Login",      nav: false, name: "Login" }
        ]);
    }

    activate(){
        this.fetchConfig.configure();
    }
}