
import { Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';
import {AuthService} from './auth/auth.service';

/* * * Microservice configuration Provider * * * * * * * * * * * * */

export class MicroserviceConfig {
    name: string;
    settings: any;
}

/* * * Restangular Provider * * * * * * * * * * * * * * * * * * * * */

/**
 * This factory method creates a specialized Restangular instance that
 * corresponds to individual Microservice configurations.
 *
 * @param restangular
 * @param microserviceConfig
 * @returns {any}
 */
let microserviceRestangularFactory = (restangular: Restangular, auth: AuthService, microserviceConfig: MicroserviceConfig) => {
    return restangular.withConfig((restangularConfigurer) => {
        console.log(restangularConfigurer);
        restangularConfigurer.setBaseUrl(microserviceConfig.settings.entrypoint.url);
        // restangularConfigurer.setDefaultHeaders({'Authorization': 'Bearer ' + auth.getToken()});

        // Intercept requests to microservices and add the JWT token
        restangularConfigurer.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
            let token = auth.getToken();
            return {
                headers: Object.assign({}, headers, {Authorization: `Bearer ${token}`})
            };
        });
    });
};

export const MICROSERVICE_RESTANGULAR = new InjectionToken<any>('MicroserviceRestangular');

export let MicroserviceRestangularProvider = {
    provide: MICROSERVICE_RESTANGULAR,
    useFactory: microserviceRestangularFactory,
    deps: [Restangular, AuthService, MicroserviceConfig]
};
