import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { ChatService } from 'src/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageInterface, MessageOutInterface } from '../chat/chatInterface';
import { faCircleUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  constructor(private ss: DashboardService, private route:ActivatedRoute, 
              private fb: FormBuilder, private cs: ChatService){}

  empId:string="";

  currentUserId:string="";
  otherUser:any={};
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=> {
      this.empId = params["empId"] || "";
      this.getEmpById(this.empId);
    });
  }

  getEmpById(id: String)
  {
    this.ss.getEmpById(this.empId).subscribe({
      next: (data) => { this.otherUser = data; },
      error: (err) => { console.error(err); },
      complete: () => { this.getCurrUser(); }
    });
  }

  getCurrUser()
  {
    this.ss.getCurrentUser().subscribe({
      next: (data) => { this.currentUserId = data.userId; },
      error: (err) => { console.error(err); },
      complete: () => { this.getAllMessages(); }
    });
  }

  //form
  chatForm = this.fb.group({
    message: ['', Validators.required]
  });


  //submiting the form to send the new message to the database
  contactMessage: MessageInterface = {messageContent:"", messageTime:"", senderId:"", receiverId:""};
  onSubmit(chatForm:FormGroup)
  {
      if(this.chatForm.valid)
      {
        let date = new Date();
        this.contactMessage.messageContent=chatForm.value["message"];
        this.contactMessage.messageTime = date.toISOString();
        this.contactMessage.senderId = this.currentUserId;
        this.contactMessage.receiverId = this.otherUser.userId;

        this.cs.saveMessage(this.contactMessage).subscribe({
          next: (data) => { 
            this.getAllMessages();
          },
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
    this.cs.getMessages(this.currentUserId, this.otherUser.userId).subscribe({
      next: (data)=>{
          console.log("chat history");
          this.allMessages = data;
          console.log(this.allMessages);
      },
      error: (err) => {console.error(err);},
      complete: () => {}
    });
  }

  //icons
  faCircleUser = faCircleUser;
  faPaperPlane = faPaperPlane;
}
