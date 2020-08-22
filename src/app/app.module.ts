import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav/nav-bar.component';
import {ToastrModule} from 'ngx-toastr';
import {ImageUploadModule} from "./image-upload/image-upload.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeModule} from "./home/home.module";
import {HttpClientModule} from "@angular/common/http";
import {ImageServices} from "./home/shared/image.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HomeModule,
        ImageUploadModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
        BrowserAnimationsModule,
        HttpClientModule
    ],
    declarations: [
        NavBarComponent,
        AppComponent,
    ],
    providers: [
        ImageServices
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
