import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventBusService {

  public userId: Subject<string> = new Subject<string>();
  public message: Subject<string> = new Subject<string>();

  constructor() { }

  showMessage(msg: string) {
    this.message.next(msg);
  }

}
