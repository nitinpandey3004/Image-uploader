import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ImageUploadService {
    constructor(private http: HttpClient) {
    }

    public upload(image: File, description: string): Observable<string | any> {
        const formData = new FormData();

        formData.append('image', image);
        formData.append('description', description);

        return this.http.post('/api/image/upload', formData)
            .pipe(map(((json: any) => json.imageUrl)));
    }
}