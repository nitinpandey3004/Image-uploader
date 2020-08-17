import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ImageUploadService} from "./image-upload.service";
import {ImageUploadComponent} from "./image-upload.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpModule
    ],
    providers: [
        ImageUploadService
    ],
    exports: [
        ImageUploadComponent
    ],
    declarations: [
        ImageUploadComponent
    ]
})

export class ImageUploadModule {

}