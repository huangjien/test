import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Injectable()
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-897297.oktapreview.com',
      clientId: '0oadwdhzx5bvaGql20h7',
      redirectUri: 'http://localhost:4200/implicit/callback',
      authParams: {
        issuer: 'default'
      }
    });
  }

  getWidget() {
    return this.widget;
  }
}
