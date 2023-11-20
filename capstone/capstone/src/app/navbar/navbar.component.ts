import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { faCircleUser, faMagnifyingGlass, faCircle } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/services/dashboard.service';
import { statusColor } from '../signup/signUpInterface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private fb: FormBuilder, private ss: DashboardService, private readonly sanitizer: DomSanitizer){}

  currentUser:String = "";
  currentUserId:String = "";
  currentuserStatus:String = "";
  public color:String = "";

  ngOnInit(): void {
    this.ss.getCurrentUser().subscribe({
      next: (data) => { 
        this.currentUser = data.name; 
        this.currentUserId = data.userId;
        this.currentuserStatus = data.status;
      },
      error: (err) => {console.error(err);},
      complete: () => {
        if(this.currentuserStatus==="Available"){ this.color=statusColor.Available}
        else if(this.currentuserStatus=="Busy"){ this.color=statusColor.Busy}
        else if(this.currentuserStatus=="DoNotDisturb"){this.color=statusColor.DoNotDisturb; }
        else if(this.currentuserStatus=="Offline"){this.color=statusColor.Offline; }
        
        this.getProfilePic()
      }
    });
  }

  
  //search bar form
  searchForm = this.fb.group({
    searchValue: ['']
  });

  public safeImage!: SafeUrl;
  imageUrl:any;
  getProfilePic()
  {
    this.ss.getImage(this.currentUserId).subscribe({
      next: (data) => {
        console.log(data.image);
        // const reader = new FileReader();
        // if(data.image.data)
        // {
        //   reader.readAsDataURL(data.image.data);
        //   reader.onloadend = (() => {
        //     const objectURL = reader.result;
        //     this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl('' + objectURL);
        //   });
        // }
       
        // this.imageUrl = 'data:image/jpeg;base64,' + base64ImageData;
        console.log(this.imageUrl);
      },
      error: (err) => {console.log(err);},
      complete: () => {}
    })
  }

  //icons
  faCircleUser = faCircleUser;
  faMagnifyingGlass = faMagnifyingGlass;
  faCircle= faCircle;
}
