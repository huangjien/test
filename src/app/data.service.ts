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

  baseUrl = 'https://localhost:8443/';

  ping() {
    return this.http.get(this.baseUrl + 'ping')
      .subscribe((response) => {
        console.log(response);
      }
      );
  }

  getSuite(id: string) {
    // this.http.get(this.baseUrl + "getSuite/"+id).subscribe{

    // }
  }

}
