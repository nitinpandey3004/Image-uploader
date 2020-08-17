import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav/nav-bar.component';
import {HomeComponent} from './home/home.component';
import {ToastrModule} from 'ngx-toastr';
import {ImageUploadModule} from "./image-upload/image-upload.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ImageUploadModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
    ],
    declarations: [
        NavBarComponent,
        AppComponent,
        HomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
