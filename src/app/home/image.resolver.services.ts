import {Injectable} from '@angular/core'
import {ImageServices} from './shared/image.service'
import {ImageDetails} from './shared/index';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";


@Injectable()
export class ImageResolverServices implements Resolve<ImageDetails[]> {
    constructor(private imageService: ImageServices) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<ImageDetails[]> {
        return this.imageService.getImages();
    }
}