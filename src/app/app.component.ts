// src/app/app.component.ts

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Okta } from './okta.service';
import { EventBusService } from './event-bus.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  user;
  oktaSignIn;

  constructor(private okta: Okta, private changeDetectorRef: ChangeDetectorRef, private swUpdate: SwUpdate) {
    this.oktaSignIn = okta.getWidget();
  }

  showLogin() {
    this.oktaSignIn.renderEl({ el: '#okta-login-container' }, (response) => {
      if (response.status === 'SUCCESS') {
        this.user = response.claims.email;
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version is available. Update to New Version?')) {
          window.location.reload();
        }
      });
    }

    this.oktaSignIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
        this.user = response.login;
        this.changeDetectorRef.detectChanges();
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
}
