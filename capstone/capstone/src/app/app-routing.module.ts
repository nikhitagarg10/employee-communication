import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ProfileComponent } from './profile/profile.component';
import { CalenderComponent } from './calender/calender.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { DirectoryComponent } from './directory/directory.component';
import { NotificationComponent } from './notification/notification.component';
import { ApprovalComponent } from './approval/approval.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:id', component:  ProfileComponent },
  { path: 'dashboard', component: DashboardComponent,  
      children: [
        { path:'calender', component: CalenderComponent },
        {
          path:'chat', component: ChatComponent, 
          children:[
            { path:"contact", component:ContactComponent},
            { path:"group", component:GroupComponent}
          ]
        },
        { path:'directory', component: DirectoryComponent },
        { path:'notification', component: NotificationComponent },
        { path:'approve', component: ApprovalComponent },
    ] },
  
  // { path: 'group/:id', component: GroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
