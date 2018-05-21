import {Component, OnInit, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import Utils from './shared/utils';


@Component({template: ``})
export class BaseComponent implements OnInit {

    name : string;
    type : string;
    id : string;
    icon : string;
    description : string;
    disabled: false;
    versions: string[];
    tags: string[];
    _data : any;
    editable: false;
    constructor(public route : ActivatedRoute, private http : HttpClient, private dataService : DataService) {}

    ngOnInit() {
        this
            .route
            .paramMap
            .subscribe(params => {
                // console.log(params);
                this.id = params.get('id');
                // TODO this.id === 0
                if (this.id !== undefined) {
                    const savedData = this.dataService.get(this.id);
                    if ( savedData === undefined) {
                        this
                            .http
                            .get(this.dataService.baseUrl + '/id/' + this.id)
                            .subscribe(res => {
                                // console.log(res);
                                this._data = res['data'];
                                this.dataService.set(this.id, this._data);
                                console.log('get data from backend', this._data);
                                if (this._data !== undefined) {
                                    this.extractFields();
                                }
                            });
                    } else {
                        // console.log('get it from cache');
                        // console.log(savedData);
                        this._data = savedData;
                        console.log('get data from cache', this._data);
                        if (this._data !== undefined) {
                            this.extractFields();
                        }
                    }
                }
            });
    }

    getIcon(type: string) {
        return Utils.getIcon(type);
    }

    private extractFields() {
        this.name = this._data['name'];
        // console.log(this._data['name']);
        this.type = this._data['type'];
        this.description = this._data['description'];
        this.icon = Utils.getIcon(this.type);
        // console.log(this.name, this.type, this.description, this.icon);
    }
}
