// app.module.ts

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
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
import { BaseComponent } from './base.component';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { EventBusService } from './event-bus.service';
import { Okta } from './okta.service';
import { environment } from '../environments/environment';
import { SuiteComponent } from './suite/suite.component';
import { CaseComponent } from './case/case.component';
import { UiComponent } from './ui/ui.component';
import { DataComponent } from './data/data.component';
import { EnvComponent } from './env/env.component';
import { ResultComponent } from './result/result.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { DataService } from './data.service';
import { SimpleViewComponent } from './simple-view/simple-view.component';
import { SettingComponent } from './setting/setting.component';
import { DragService } from './drag-service';
import { DraggableDirective } from './draggable.directive';
import { DropTargetDirective } from './drop-target.directive';
import { OutComponent } from './out/out.component';

const config = {
  issuer: 'https://dev-897297.oktapreview.com/oauth2/default',
  redirectUri: 'https://localhost:4200/implicit/callback',
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
    path: 'environments',
    component: EnvComponent
  },
  {
    path: 'Result/:id',
    component: ResultComponent
  },
  {
    path: 'settings',
    component: SettingComponent
  }
  ,
  {
    path: 'OUT/:id',
    component: OutComponent
  }
  ,
  {
    path: 'Case/:id',
    component: CaseComponent
  },
  {
    path: 'Suite/:id',
    component: SuiteComponent
  },
  {
    path: 'Data/:id',
    component: DataComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SuiteComponent,
    CaseComponent,
    UiComponent,
    DataComponent,
    EnvComponent,
    ResultComponent,
    DynamicComponent,
    SimpleViewComponent,
    DraggableDirective,
    DropTargetDirective,
    SettingComponent,
    BaseComponent,
    OutComponent
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
    MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule, FormsModule,
    BrowserAnimationsModule, ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [EventBusService, Okta, DataService, DragService],
  bootstrap: [AppComponent]
})
export class AppModule {}
