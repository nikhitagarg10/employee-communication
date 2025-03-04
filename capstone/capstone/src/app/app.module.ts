import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { CalenderComponent } from './calender/calender.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DirectoryComponent } from './directory/directory.component';
import { NotificationComponent } from './notification/notification.component';
import { ApprovalComponent } from './approval/approval.component';
import { AuthInterceptorService } from './auth/authInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    GroupComponent,
    NavbarComponent,
    ProfileComponent,
    CalenderComponent,
    ChatComponent,
    ContactComponent,
    DirectoryComponent,
    NotificationComponent,
    ApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    FullCalendarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
