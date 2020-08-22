import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from "./home.component";
import {HomeServices} from "./home.services";
import {ImageResolverServices} from "./image.resolver.services";
import {ImageServices} from "./shared/image.service";
// import {ButtonsModule, WavesModule, CardsModule} from 'angular-bootstrap-md';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
    ],
    providers: [
        HomeServices,
        ImageResolverServices,
        ImageServices
    ],
    exports: [
        HomeComponent
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {

}