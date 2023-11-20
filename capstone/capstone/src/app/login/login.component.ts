import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { LoginInterface } from './loginInterface';
import { Router } from '@angular/router';
import { DashboardService } from 'src/services/dashboard.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private ss: LoginService, 
              private router: Router, private ds: DashboardService){}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  public loginEmp: LoginInterface= {"email":"", "password":""};
  error = false;
  onSubmit(loginFormVal: FormGroup)
  {
    if(this.loginForm.valid)
    {
      this.loginEmp = loginFormVal.value;
      this.ss.LoginEmp(this.loginEmp).pipe(
        switchMap((data) => {
          console.log(data);
          localStorage.setItem('access_token', data.jwtToken);
          return this.ds.getCurrentUser();
        })
      ).subscribe({
        next: (data)=> {
          console.log(data.department)
          if(data.department === 'admin'){
            console.log("ok");
            localStorage.setItem("isAdmin", "true");
          }
          else{
            localStorage.setItem("isAdmin", "false");
          }
        },
        error: (err) => {
          console.log(err);
          this.error = true;
        },
        complete: () => {
          this.router.navigate(['dashboard/calender']);
        }
      });
      // this.ss.LoginEmp(this.loginEmp).subscribe({
      //   next: (data) => {
      //     console.log(data);
      //     localStorage.setItem('access_token', data.jwtToken);
      //   },
      //   error: (err) => {
      //     this.error = true;
      //   },
      //   complete: () => {
      //       this.ds.getCurrentUser().subscribe({
      //         next: (data)=> {
      //           console.log(data.department)
      //           if(data.department === 'admin'){
      //             console.log("ok");
      //             localStorage.setItem("isAdmin", "true");
      //           }
      //           else{
      //             localStorage.setItem("isAdmin", "false");
      //           }
      //         },
      //         error: (err) => {console.log(err);},
      //         complete: () => {
      //           this.router.navigate(['dashboard/calender']);
      //         }
      //       })
      //   }
      // });
    }
    else{
      console.error("login form is invalid");
    }
    
  }

  closeToaster()
  {
    this.error = false;
  }
}
