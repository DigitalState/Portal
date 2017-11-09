import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaThemePreloader {

    private static loaders:Array<Observable<any>> = [];

    public static registerLoader(loader: Observable<any>): void {
        BaThemePreloader.loaders.push(loader);
    }

    public static clear(): void {
        BaThemePreloader.loaders = [];
    }

    /**
     * Begins processing the loaders (observables) and waits for results in the same
     * sequence in which there were registered.
     * @return Observable<any> An observable with all results
     */
    public static load(): Observable<any> {
        return Observable.forkJoin(BaThemePreloader.loaders);
    }
}
