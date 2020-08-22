import {Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, Input} from '@angular/core';
import {MultiSelect, SelectEventArgs, RemoveEventArgs} from '@syncfusion/ej2-dropdowns';
import {ImageDetails, ImageType} from './shared/index';
import {ImageServices} from "./shared/image.service";
import {ActivatedRoute} from "@angular/router";
import $ from 'jquery';

let multiselectComp: MultiSelect;
let filterCategory: { [key: string]: Object; }[] = [
    {Name: 'JPEG', Code: 'image/jpeg'},
    {Name: 'PNG', Code: 'image/png'}];

@Component({
    selector: 'app1-root',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
    @Input() Image_Details: any;
    public imageList: ImageDetails[] ;
    imageTypes: any = {};

    constructor (private imageService: ImageServices, private route: ActivatedRoute) {

    }

    public ngOnInit(): void {
        this.imageList = this.restructureData(this.route.snapshot.data.imageList.data);
    }

    private restructureData (data): ImageDetails[] {

        //change image name
        for (var i in data) {
            data[i]["fileName"] = data[i]["fileName"].split("_")[1];
            const num = data[i]["size"] / 1000;
            data[i]["size"] = num.toFixed(1);
        }
        return data;
    }

    public ngAfterViewInit(): void {
        multiselectComp = new MultiSelect({
            // set the local data to dataSource property
            dataSource: filterCategory,
            // map the appropriate columns to fields property
            fields: {text: 'Name', value: 'Code'},
            // set the placeholder to MultiSelect input element
            placeholder: 'Search by Image Type',
            select: this.multiSelectFun.bind(this),
            removed: this.multiSelectRemove.bind(this),
        });
        multiselectComp.appendTo('#local');
    }

    public multiSelectRemove(e: RemoveEventArgs): void {
        const allCodes = (e.itemData as ImageType).Code;
        if (allCodes) {
            const removedParams = allCodes.split(',');
            removedParams.forEach((val) => {
                this.imageTypes[val] = 0;
            });
        }
    }

    public multiSelectFun(e: SelectEventArgs): void {
        const allCodes = (e.itemData as ImageType).Code;
        if (allCodes) {
            const removedParams = allCodes.split(',');
            removedParams.forEach((val) => {
                this.imageTypes[val] = 1;
            });
        }
    }

    public submitFilter() {
        let conditions = {};
        const description = $("#search_Card").val();
        if(description) {
            conditions["description"] = description;
        }

        const size = $("#search_Card1").val();
        if (size) {
            conditions["size"] = size;
        }

        if(this.imageTypes) {
            conditions["fileTypes"] = Object.keys(this.imageTypes).filter(type => this.imageTypes[type] === 1);
        }
        let searchConditions = {
            conditions: conditions
        };
        this.imageService.getImages(searchConditions).subscribe((res) => {
            this.imageList = this.restructureData(res["data"]);
        })
    }
}