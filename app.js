
export class App {
    configureRouter(config, router) {
        this.router = router;
        config.map([
            { route: ["", "list"], moduleId: "movies/list", title: "List", nav: true, name: "home" },
            { route: "about", moduleId: "about/about", title: "About", nav: true, name: "about" },
            { route: "details/:id", moduleId: "movies/details", name: "movieDetails" },
            { route: "edit/:id", moduleId: "movies/edit", name: "edit" },
            { route: "create", moduleId: "movies/edit", name: "create" },
            { route: "users/list", moduleId: "users/list", title: "Users", nav: true, name: "usersList" },
            { route: "details/:id", moduleId: "users/details", name: "userDetails" }
        ]);
    }
}