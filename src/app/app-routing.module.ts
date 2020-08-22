import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {ImageResolverServices} from "./home/image.resolver.services";

const routes: Routes = [
    {path: 'home', component: HomeComponent, resolve: {
        imageList: ImageResolverServices
    }},
    {path: 'upload', component: ImageUploadComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
