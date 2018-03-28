import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Case {
  name: string;
}

interface Suite {
  name: string;
}

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getSuite(id: string) {
    // this.http.get(this.baseUrl + "getSuite/"+id).subscribe{

    // }
  }

}
