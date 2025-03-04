import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { LoginInterface } from './loginInterface';
import { Router } from '@angular/router';
import { DashboardService } from 'src/services/dashboard.service';
import { switchMap } from 'rxjs';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private loginService: LoginService, 
              private router: Router, private dashboardService: DashboardService){}

  //icons
  faEye= faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

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
      this.loginService.LoginEmp(this.loginEmp).pipe(
        switchMap((data) => {
          localStorage.setItem('access_token', data.jwtToken);
          return this.dashboardService.getCurrentUser();
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
