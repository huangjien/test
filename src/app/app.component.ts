// src/app/app.component.ts

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Okta } from './okta.service';
import { EventBusService } from './event-bus.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { DataService } from './data.service';
import { SimpleViewComponent } from './simple-view/simple-view.component';
import { HttpClient } from '@angular/common/http';

import Utils from './shared/utils';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  typeList = new FormControl();
  typeChosen: any;
  user;
  oktaSignIn;
  searchString: string;
  types = ['Suite', 'Case', 'Data', 'OUT'];
  results: any[];
  // expand = false;
  panelOpenState = false;

  constructor(private okta: Okta, private changeDetectorRef: ChangeDetectorRef,
    private swUpdate: SwUpdate, private eventBus: EventBusService,
    private snackBar: MatSnackBar, private dataService: DataService,
  private router: Router, private http: HttpClient) {
    this.oktaSignIn = okta.getWidget();
  }

  showLogin() {
    this.oktaSignIn.renderEl({ el: '#okta-login-container' }, (response) => {
      if (response.status === 'SUCCESS') {
        // console.log(response);
        this.user = response.claims.email;
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    // automatically update App when there is new update
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version is available. Update to New Version?')) {
          window.location.reload();
        }
      });
    }

    // message subscribe
    this.eventBus.message.subscribe(value => {
      this.snackBar.open(value, null, { duration: 1500 });
    });

    // okta signIn check
    this.oktaSignIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
        this.user = response.login;
        this.changeDetectorRef.detectChanges();
        this.eventBus.message.next(this.user + ' is current user.');
      } else {
        this.showLogin();
      }
    });
  }

  logout() {
    this.oktaSignIn.signOut(() => {
      this.router.navigate(['/']);
      this.user = undefined;
      this.changeDetectorRef.detectChanges();
      this.showLogin();
    });
  }

  onEnter() {
    this.search();
  }

  clear() {
    this.searchString = '';
    this.results = [];
    this.typeChosen = [];
  }

  search() {
    // alert(this.types);
    // TODO test with fix data now
    this.http.get(this.dataService.baseUrl + '/query/type:(Data Case Suite)')
    .subscribe((response: Response) => {
      const data = response['data'];
      // console.log(data);
      this.results = JSON.parse(data);
      this.results.forEach(element => {
        const id = element['id'];
        this.dataService.set(id, element);
      });
    });
  }

  test(msg: string) {
    this.eventBus.showMessage(msg);
  }

  ping() {
    console.log(this.dataService.get('0010070000001'));
  }
}
