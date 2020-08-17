import {Component, EventEmitter, Output} from "@angular/core";
import {ToastrService} from 'ngx-toastr';
import {ImageUploadService} from "./image-upload.service";
import {HttpErrorResponse} from '@angular/common/http';
import $ from 'jquery';

class FileDetails {
    pending: boolean = false;
    status: string = 'INIT';

    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})

export class ImageUploadComponent {

    @Output() imageUploaded = new EventEmitter();
    @Output() imageError = new EventEmitter();

    selectedFile: FileDetails;
    imageChangedEvent: any;

    constructor(private toastr: ToastrService,
                private imageService: ImageUploadService) {
    }

    private onSucces(imageUrl: string) {
        this.selectedFile.pending = false;
        this.selectedFile.status = 'OK';
        this.imageChangedEvent = null;
        this.imageUploaded.emit(imageUrl);
    }

    private onFailure() {
        this.selectedFile.pending = false;
        this.selectedFile.status = 'FAIL';
        this.imageChangedEvent = null;
        this.imageError.emit('');
    }

    handleChange(event: any) {
        const fileName = event.target.files[0].name;
        if(fileName) {
            this.selectedFile = new FileDetails('', event.target.files[0]);

            const URL = window.URL;
            let file, img;

            if ((file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                img = new Image();

                img.src = URL.createObjectURL(file);
                $('label[for="inputGroupFile01"]').html(fileName);
            } else {
                this.toastr.error('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
            }
        }
    }

    uploadImage() {
        console.log(this.selectedFile);
        if(this.selectedFile) {
            const reader = new FileReader();

            reader.addEventListener('load', (event: any) => {
                this.selectedFile.src = event.target.result;

                this.selectedFile.pending = true;
                this.imageService.upload(this.selectedFile.file).subscribe(
                    (imageUrl: string) => {
                        this.onSucces(imageUrl);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        this.toastr.error(errorResponse.error.errors[0].detail, 'Error!');
                        this.onFailure();
                    })
            });

            reader.readAsDataURL(this.selectedFile.file);
        }
    }
}