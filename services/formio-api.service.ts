import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Restangular } from 'ngx-restangular';

import { MicroserviceConfig, microserviceRestangularFactory } from '../providers/microservice.provider';
import { AppState } from '../../app.service';
import { AuthService } from '../modules/auth/auth.service';
import { CmsApiService } from './cms.service';
import { DsBaseEntityApiService } from './base-entity-api.service';
import { IdentityUtils } from '../utils/identity.utils';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

@Injectable()
export class FormioApiService {

    protected entityApiService: DsBaseEntityApiService<any>;

    constructor(protected cms: CmsApiService) {

    }

    /**
     *
     * @param entityApiService
     */
    setEntityApiService(entityApiService: DsBaseEntityApiService<any>) {
        this.entityApiService = entityApiService;
    }

    /**
     *
     * @param route
     * @param id
     */
    getForm(route: string, id: string): Observable<{ form?: any, translations?: any }> {
        return this.entityApiService.one(route, id).customGET('forms').flatMap(form => {
            // Remove Restangular's functions and metadata from entity
            if (isFunction(form.plain)) {
                form = form.plain();
            }

            // Load form translations from the CMS
            // return this.cms.getFormioFormTranslations(form.id).subscribe((translations) => {
            //     return Observable.of({
            //         form: form,
            //         translations: translations
            //     });
            // }, (error) => {
            //     console.warn(`FormioApiService.getForm failed to fetch form translations`);
            //     return Observable.throw(this.handleActivationRequestError(error));
            // });
            return this.cms.getFormioFormTranslations(form.id).flatMap((translations) => {
                return Observable.of({
                    forms: form,
                    translations: translations
                });
            }).catch((error) => {
                console.warn(`FormioApiService.getForm failed to fetch form translations`);
                return Observable.throw(this.handleActivationRequestError(error));
            });
        }).catch((error) => {
            return Observable.throw(this.handleActivationRequestError(error));
        });
    }

    /**
     *
     * @param route
     * @param id
     * @param submission
     */
    submitFormUsingPost(route: string, id: string, submission: any): Observable<any> {
        return this.entityApiService.one(route, id).all('submissions').post(submission).flatMap(submissionResult => {
            return Observable.of(submissionResult);
        }).catch((error) => {
            return Observable.throw(this.handleSubmissionRequestError(error));
        });
    }

    /**
     *
     * @param route
     * @param id
     * @param submission
     */
    submitFormUsingPut(route: string, id: string, submission: any, path?: string): Observable<any> {
        return this.entityApiService.one(route, id).customPUT(submission, path).flatMap(submissionResult => {
            return Observable.of(submissionResult);
        }).catch((error) => {
            return Observable.throw(this.handleSubmissionRequestError(error));
        });
    }

    /**
     *
     * @param error
     * @returns {Promise<never>}
     */
    protected handleActivationRequestError(error: any): DsError {
        let errorResult: any = {
            title: 'ds.messages.formActivationError',
        };

        if (error instanceof Response) {
            errorResult.message = 'ds.messages.http.' + error.status;
            errorResult.type = error.status;
        }
        else {
            try {
                const json = isFunction(error.json) ? error.json() : null;

                if (json && json.message) {
                    errorResult.message = json.message;
                    errorResult.type = error.status;
                }
            }
            catch (exception) {

            }
        }

        return errorResult as DsError;
    }

    /**
     *
     * @param error
     */
    protected handleSubmissionRequestError(error: any): any {
        let errorResult: any = {
            title: 'ds.messages.formSubmissionError',
        };

        if (error instanceof Response) {
            errorResult.message = 'ds.messages.http.' + error.status;
            errorResult.type = error.status;
        }
        else {
            try {
                const json = isFunction(error.json) ? error.json() : null;

                if (json && json.message) {
                    errorResult.message = json.message;
                    errorResult.type = error.status;
                }
            }
            catch (exception) {

            }
        }

        return errorResult as DsError;
    }

}
