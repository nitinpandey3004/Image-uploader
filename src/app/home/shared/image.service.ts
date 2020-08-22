import {Injectable, EventEmitter} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Observable, of} from 'rxjs'
import {ImageDetails} from './image.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ImageServices {
    constructor(private http: HttpClient) {

    }

    getImages(searchConditions: any = {}): Observable<ImageDetails[]> {

        return this.http.post<ImageDetails[]>('/api/image/fetchResult', searchConditions )
            .pipe(catchError(this.handleError<ImageDetails[]>('getEvents', [])))
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}