/**
 * Created by RSexton on 11/27/2015.
 */
export function configure(aurelia) {
    aurelia.use
           .standardConfiguration()
           .developmentLogging();
    aurelia.start().then(a => a.setRoot());
};
