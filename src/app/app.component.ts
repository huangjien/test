// src/app/app.component.ts

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Okta } from './okta.service';
import { EventBusService } from './event-bus.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { DataService } from './data.service';
import { SimpleViewComponent } from './simple-view/simple-view.component';

import Utils from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  user;
  oktaSignIn;
  searchString: string;
  results: any;
  // expand = false;
  panelOpenState = false;

  constructor(private okta: Okta, private changeDetectorRef: ChangeDetectorRef,
    private swUpdate: SwUpdate, private eventBus: EventBusService,
    private snackBar: MatSnackBar, private dataService: DataService) {
    this.oktaSignIn = okta.getWidget();
  }

  showLogin() {
    this.oktaSignIn.renderEl({ el: '#okta-login-container' }, (response) => {
      if (response.status === 'SUCCESS') {
        console.log(response);
        this.user = response.claims.email;
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
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
  }

  search() {
    // TODO test with fix data now
    this.results = [{id: 'xxxx', type: 'Data', name: 'XXX', description: 'Blalalalalala'},
    {id: 'yyyy', type: 'Data', name: 'YYYY', description: 'Blalalalalala'}];
  }

  test(msg: string) {
    this.eventBus.showMessage(msg);
  }

  ping() {
    this.dataService.ping();
  }
}
