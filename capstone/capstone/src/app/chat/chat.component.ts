import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { faCircleUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreategroupComponent } from 'src/shared/creategroup/creategroup.component';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  constructor(private ss: DashboardService, private router: Router, public dialog: MatDialog){}

  public allEmps: Array<any> = [];
  currentUserId:String = "";
  ngOnInit(): void {

    // this.ss.getCurrentUser().subscribe({
    //   next: (data) => { this.currentUserId = data.userId; },
    //   error: (err) => { console.error(err); },
    //   complete: () => { 
    //     this.getAllEmps(this.currentUserId); 
    //     this.getAllGrps(this.currentUserId);
    //   }
    // });

    // this.ss.changeOccurred$.subscribe(() => {
    //   this.getAllGrps();
    // });

    this.ss.getCurrentUser().pipe(
      switchMap((data) => {
        this.currentUserId = data.userId;
        this.getAllEmps(this.currentUserId);
        this.getAllGrps(this.currentUserId);
        return this.ss.changeOccurred$;
      })
    ).subscribe({
      next: (data) => {this.getAllGrps(this.currentUserId);}, 
      error: (err) => { console.error(err); },
      complete:() => {},
    });
  }

  getAllEmps(curId:String)
  {
    this.ss.GetAllEmps().subscribe({
      next: (data) => { this.allEmps=data.filter((d:any)=>{ return d.id !== curId;}); },
      error: (err) => { console.error(err); },
      complete: () => {}
    });
  }

  public allGrps: Array<any> = [];
  getAllGrps(curId:String)
  {
    this.ss.getAllGroups().subscribe({
      next: (data) => { this.allGrps=data.filter((d:any)=>{
            return (d.emps.find((empId:String)=> empId===curId));
      })},
      error: (err) => { console.error(err); },
      complete: () => {}
    });
  }

 
  default=true;
  contactClicked=true;
  groupClicked=false;

  clickContact(){ 
    if(this.clickToChatGroupVar){
      this.default = true;
    }
    this.contactClicked=true; 
    this.groupClicked=false;
  }
  clickGrp(){ 
    if(this.clickToChatContactVar){
      this.default = true;
    }
    this.groupClicked=true; 
    this.contactClicked=false;
  }

  clickToChatContactVar = false;
  clickToChatGroupVar = false;
  clickToChatContact(id:string)
  {
    this.clickToChatContactVar = true;
    this.default = false;
    this.router.navigate(['/dashboard/chat/contact'], { queryParams: { empId: id } });
  }

  clickToChatGroup(id:string)
  {
    this.clickToChatGroupVar = true;
    this.default = false;
    this.router.navigate(['/dashboard/chat/group'], { queryParams: { grpId: id } });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreategroupComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        result.emps.push(this.currentUserId);
        this.ss.createGroup(result).subscribe({
          next: (data)=>{ console.log(data);},
          error: (err) => {console.log(err)},
          complete: () => {this.getAllGrps(this.currentUserId);},
        });
      }
    });
  }

  //icons
  faCircleUser = faCircleUser;
  faPlus = faPlus;

}
