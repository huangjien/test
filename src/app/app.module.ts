// app.module.ts

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { EventBusService } from './event-bus.service';
import { Okta } from './okta.service';

const config = {
  issuer: 'https://dev-897297.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oadwdhzx5bvaGql20h7'
};

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProtectedComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config),
    BrowserModule, HttpClientModule, MatButtonModule, MatCheckboxModule,
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
    MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
    MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule,
    BrowserAnimationsModule
  ],
  providers: [EventBusService, Okta],
  bootstrap: [AppComponent]
})
export class AppModule {}
