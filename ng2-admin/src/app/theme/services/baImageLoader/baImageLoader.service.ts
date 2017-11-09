import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaImageLoaderService {

    public load(src: string): Observable<any> {

        let img = new Image();
        let onImageLoad = () => {
            return Observable.of('Image with src ' + src + ' loaded successfully.');
        };

        img.src = src;
        img.onload = onImageLoad;

        return Observable.defer(onImageLoad);
    }
}
