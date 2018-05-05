import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
// import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

interface CacheContent {
  expiry : number;
  value : any;
}

@Injectable()
export class DataService {
  readonly DEFAULT_EXPIRY : number = 300000;
  private cache : Map < string,
  CacheContent > = new Map < string,
  CacheContent > ();

  constructor(private http : HttpClient) {}

  baseUrl = 'https://localhost:8443/api/v1.0';

  ping() {
    return this
      .http
      .get(this.baseUrl + '/ping')
      .subscribe((response) => {
        console.log(response);
      });
  }

  // id(id : string) {
  //   return this
  //     .http
  //     .get(this.baseUrl + '/id/' + id, {observe: 'response'})
  //     .subscribe((response) => {
  //       const data = response.body['data'];
  //       const _id = data['id'];
  //       this.set(_id, data);
  //       console.log(data);
  //       return data;
  //     });
  // }

  get(key : string, maxAge?: number) : any {
    if (this.hasValidCachedValue(key)) {
      return this.cache.get(key).value;
    }
    return undefined;
  }

  private hasValidCachedValue(key : string) : boolean {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this
          .cache
          .delete(key);
        return false;
      }
      return true;
    }
    return false;
  }
  set(key : string, value : any, maxAge : number = this.DEFAULT_EXPIRY) : void {
    this
      .cache
      .set(key, {
        value: value,
        expiry: Date.now() + maxAge
      });
  }

  has(key : string) : boolean {
    return this
      .cache
      .has(key);
  }

}
