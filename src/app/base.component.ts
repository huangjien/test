import {Component, OnInit, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Component({template: ``})
export class BaseComponent implements OnInit {

    name : string;
    type : string;
    id : string;
    icon : string;
    description : string;
    _data : any;
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
                            });
                    } else {
                        // console.log('get it from cache');
                        // console.log(savedData);
                        this._data = savedData;
                    }
                }
            });
    }
}
