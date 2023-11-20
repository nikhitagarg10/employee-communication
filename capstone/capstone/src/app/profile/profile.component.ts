import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from 'src/services/dashboard.service';
import { ProfileService } from 'src/services/profile.service';
import { UpdateService } from 'src/services/update.service';

import { Router } from '@angular/router';
import { faCamera, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { statusColor } from '../signup/signUpInterface';



class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
    private ss: DashboardService, private router: Router, private _snackBar: MatSnackBar,
    private ps:ProfileService, private us: UpdateService){}

    // private _snackBar: MatSnackBar

  passwordForm = this.fb.group({
    oldpassword: ['', [Validators.required, Validators.email]],
    newpassword: ['', Validators.required]
  });

  password: Array<String> = [];
  onSubmit(formval: FormGroup)
  {
    this.password.push(formval.value["oldpassword"]);
    this.password.push(formval.value["newpassword"]);
    this.ps.changePassword(this.empId, this.password).subscribe({
      next: (data)=>{console.log(data);},
      error: (err)=> {console.log(err)},
      complete: () => {}
    }
    )
  }

  empId:String = "";
  public statusColors: any = Object.entries(statusColor).map(([key, value]) => ({ status:key, color:value }))
  ngOnInit(): void {
    this.empId = this.route.snapshot.params['id'];
    this.getEmpData();

  }

  empData = {
    "id": "",
    "name": "",
    "email": "",
    "phone": "",
    "department": "",
    "role": "",
    "status": ""

  };
  getEmpData(){
    this.ss.getEmpById(this.empId).subscribe({
      next: (data)=>{
        this.empData.id = data.userId;
        this.empData.name = data.name;
        this.empData.email = data.email;
        this.empData.phone = data.phone;
        this.empData.department = data.department;
        this.empData.role = data.role;
        this.empData.status = data.status;
      },
      error: (err)=>{},
      complete: ()=>{}
    })
  }

  NameUpdate = false;
  updateNameForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  EmailUpdate = false;
  updateEmailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  
  PhoneUpdate = false;
  phoneRegex = /^[0-9]{10}$/;
  updatePhoneForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
  });
  
  updateName(){
    this.NameUpdate = true;
  }
  updateEmail(){
    this.EmailUpdate = true;
  }
  updatePhone(){
    this.PhoneUpdate = true;
  }

  onSubmitNewVal(nameForm: FormGroup, type:string)
  {
    this.us.requestApproval(this.empId, type, nameForm.value[type]).subscribe({
      next: (data) => {console.log(data);},
      error: (err) => {console.log(err);},
      complete: () => {}
    })
  }

  updateStatusForm = this.fb.group({
    status: [this.empData.status, [Validators.required]],
  });

  onSubmitStatus(statusForm: FormGroup)
  {
    console.log(statusForm.value.status);
    this.ss.statusChange(statusForm.value.status, this.empId).subscribe({
      next: (data) => {console.log(data);},
      error: (err) => {console.log(err);},
      complete: () => {}
    })
  }



  logout()
  {
    localStorage.removeItem("access_token");
    this.openLogoutBar()
    this.router.navigate(['']);
  }

  openLogoutBar() {
    this._snackBar.open("Logout Successful", "OK", {
      duration: 3000,
      panelClass: ['blue-snackbar'],
     });
  }


  //image
  imageSrc: any;
  selectedFile: ImageSnippet = {"src":"", "file":{} as File};

  
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.imageSrc = URL.createObjectURL(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log('File reader loaded successfully!');
    }
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.ss.uploadImage(this.selectedFile.file, this.empId).subscribe({
        next: (data)=>{console.log(data)},
        error: (err)=>{},
        complete: ()=>{
        }
      })
    });
  }


  //icons
  faCamera = faCamera;
  faCircle = faCircle;
}
