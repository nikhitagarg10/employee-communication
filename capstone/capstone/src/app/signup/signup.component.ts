import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/services/signup.service';
import { SignUpInterface, empDepartment, empStatus, empRole, statusColor } from './signUpInterface';
import { Router } from '@angular/router';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit {

  constructor(private fb: FormBuilder, private ss: SignupService, private router: Router){}

  public color:String = "";
  ngAfterViewInit() {
    this.color = statusColor.Available; 
  }

  phoneRegex = /^[0-9]{10}$/;

  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
    department: ['', Validators.required],
    role: ['', Validators.required],
    status: [empStatus.Available, Validators.required]
  });

  public signUpEmp: SignUpInterface = {
    "name": "", 
    "email":"", 
    "password":"", 
    "phone": 0,
    "department": empDepartment.HR,
    "role": empRole.HR_associate,
    "status": empStatus.Available
  };

  empStatus = empStatus;
  empDepartment = empDepartment;
  empRole = Object.keys(empRole);
  filterEmpRole:string[] = [];

  departmentValue = "";
  roleValue = "";
  getFilteredInput2Options()
  {
    this.filterEmpRole = this.empRole.filter((r)=>{
        if(r.split('_')[0]===this.departmentValue){
            return true;
        }
        return false;
    });     
    return this.filterEmpRole;
  }

  onSubmit(signUpFormVal: FormGroup)
  {
    if(this.signUpForm.valid){
      this.signUpEmp = signUpFormVal.value;
      console.log(this.signUpEmp);
      this.ss.SigninEmp(this.signUpEmp).subscribe({
        next: (data) => {
          console.log("data after user clicked signup button");
          console.log(data);
          this.router.navigate(['']);
        },
        error: (err) => { console.error(err); },
        complete: () => {}
      });
    }
    else{
      console.error("the sign up form is invalid");
    }
  }

  //icons
  faCircle = faCircle;
}
