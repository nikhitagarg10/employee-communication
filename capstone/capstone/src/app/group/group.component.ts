import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/services/group.service';
import { DashboardService } from 'src/services/dashboard.service';
import { groupOutInterface } from '../dashboard/dashboardEmpInterface';
import { ChatService } from 'src/services/chat.service';
import { MessageInterface, MessageOutInterface } from '../chat/chatInterface';
import { groupMembers } from './groupInterface';
import { dashboardEmpInterface } from '../dashboard/dashboardEmpInterface';
import { faCircleUser, faPaperPlane, faGear, faUsers, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { GrpeditComponent } from 'src/shared/grpedit/grpedit.component';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, combineLatest, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit{

  constructor(private route: ActivatedRoute, private ss: GroupService, 
              private fb: FormBuilder, private ds: DashboardService, private cs: ChatService,
              public dialog: MatDialog) {}
  
  groupData:groupOutInterface = {"group_id": "", "group_name":"", "emps":[]};
  groupId: string = "";
  ngOnInit(){
    this.groupId = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe(params=> {
      this.groupId = params["grpId"] || "";
      this.getGroupInfo(this.groupId);
    });
    
  }

  currentUserId:string="";
  getCurrUser()
    {
      this.ds.getCurrentUser().subscribe({
        next: (data) => { this.currentUserId = data.userId; },
        error: (err) => { console.error(err); },
        complete: () => { this.getAllMessages()}
      });
    }

  
  getGroupInfo(id:String)
  {
    console.log(id);
    this.ss.getGroupById(id).subscribe({
      next: (data) =>{
        this.groupData=data;
      },
      error: (err) => {console.log(err);},
      complete: () => { 
        this.getCurrUser();
        this.grpMem = this.getgrpMem();
      }
    })
  }

  //form
  grpChatForm = this.fb.group({
    message: ['', Validators.required]
  });

  grpContactMessage: MessageInterface = {messageContent:"", messageTime:"", senderId:"", receiverId:""};
  onSubmit(grpchatForm:FormGroup)
  {
      if(grpchatForm.valid)
      {
        let date = new Date();
        this.grpContactMessage.messageContent=grpchatForm.value["message"];
        this.grpContactMessage.messageTime = date.toISOString();
        this.grpContactMessage.senderId = this.currentUserId;
        this.grpContactMessage.receiverId = this.groupId;

        this.cs.saveMessage(this.grpContactMessage).subscribe({
          next: (data) => { this.getAllMessages(); },
          error: (err) => {console.error(err);},
          complete: () => {}
        });
      }
      else{
        console.error("chat form is invalid");
      }
  }

  allMessages:Array<MessageOutInterface> = [];
  //get all the messages betwene a particular sender and receiver
  getAllMessages()
  {
    this.cs.getMessages(this.currentUserId, this.groupId).subscribe({
      next: (data)=>{
          this.allMessages = data;
      },
      error: (err) => {console.error(err);},
      complete: () => {}
    });
  }

  public grpMem: Array<groupMembers> = [];
  getgrpMem()
  {
    const grpMem: Array<groupMembers> = [];
    this.groupData.emps.filter((emp)=>{
      this.ds.getEmpById(emp).subscribe({
        next: (data)=>{
          const userInfo : groupMembers = {id: emp, name: data.name, status: data.status, email: data.email};
          grpMem.push(userInfo)
        },
        error: (err)=> {console.log(err);},
        complete: () => {}
      })
    })
    return grpMem;
  }


  deleteGrpMem(id: String)
  {
    this.ss.deleteEmpGroup(this.groupId, [id]).subscribe({
      next: (data)=> { console.log(data); },
      error: (err)=> { console.log(err); },
      complete: () => { 
        this.getGroupInfo(this.groupId);
        this.grpMem = this.getgrpMem();
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GrpeditComponent, {
      width: '70%',
      data: this.grpMem
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        if(result.group_name.length != 0){
            this.ss.updateGroupName(this.groupId, result.group_name).subscribe({
              next: (data) =>{console.log(data);},
              error: (err) => {console.log(err);},
              complete: () => {
                this.getGroupInfo(this.groupId);
              }
            });
        }

        this.ss.addNewEmp(this.groupId, result.emps).subscribe({
          next: (data) =>{console.log(data);},
          error: (err) => {console.log(err);},
          complete: () => {
            this.getGroupInfo(this.groupId);
            this.grpMem = this.getgrpMem();}
        });
      }
      this.ds.triggerChange();
    });
  }

  //icons
  faCircleUser = faCircleUser;
  faPaperPlane = faPaperPlane;
  faTrash = faTrash;
  faGear = faGear;
  faUsers = faUsers;
}
