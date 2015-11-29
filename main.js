/**
 * Created by RSexton on 11/27/2015.
 */
import config from './authConfig';

export function configure(aurelia) {
    aurelia.use
           .standardConfiguration()
           .developmentLogging()
           .plugin("aurelia-validation")
           .plugin('aurelia-auth', (baseConfig)=>{
               baseConfig.configure(config);
            });

    aurelia.start().then(a => a.setRoot());
};
