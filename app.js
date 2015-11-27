
export class App {
    configureRouter(config, router) {
        this.router = router;
        config.map([
            { route: ["", "list"], moduleId: "movies/list", title: "List", nav: true },
            { route: "about", moduleId: "about/about", title: "About", nav: true }
        ]);
    }
}