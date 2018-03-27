import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';
import { EventBusService } from '../event-bus.service';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent implements OnInit {
  signIn;

  widget = new OktaSignIn({
    baseUrl: 'https://dev-897297.oktapreview.com'
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.widget.renderEl(
      { el: '#okta-signin-container'}, res => {
        if (res.status === 'SUCCESS') {
          this.signIn.loginRedirect({ sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      }
    );
  }
}
