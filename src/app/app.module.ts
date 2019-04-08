import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { LoginPageComponent } from './login-page/login-page.component';
import { AfService } from './providers/af.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    PagesListComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    FullCalendarModule
  ],
  providers: [AfService,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
