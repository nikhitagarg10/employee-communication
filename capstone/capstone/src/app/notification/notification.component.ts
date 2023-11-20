import { Component, OnInit } from '@angular/core';
import { CalenderService } from 'src/services/calender.service';
import { CalenderInterface } from '../calender/calenderInterface';
import { NotificationService } from 'src/services/notification.service';
import { DashboardService } from 'src/services/dashboard.service';
import { notificationOutInterface } from './notificationInterface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  constructor(private ss: CalenderService, private ns: NotificationService, private ds: DashboardService) {}

  ngOnInit(): void {
    this.getCurrUser();
  }

  currId = "";
  getCurrUser()
  {
      this.ds.getCurrentUser().subscribe({
        next: (data)=> {this.currId = data.userId},
        error: (err) => {console.log(err);},
        complete: () => {
          this.getAllEvents()
          this.getChats();
        }
      })     
  }

  eventToday = false;

  allEvents: Array<CalenderInterface> = [];
  filterEvents: Array<CalenderInterface> = [];
  date = "";
  getAllEvents()
  {
    this.ss.getAllEvents(this.currId).subscribe({
      next:(data)=>{this.allEvents = data;},
      error:(err)=>{console.log(err);},
      complete:()=>{
        const now = new Date();
        this.date = now.toISOString();

        this.filterEvents = this.allEvents.filter((e)=>{
          if(this.date >= e.start && this.date <= e.end){
            this.eventToday = true;
            return true;
          }
          return false;
        })
      }
    });
  }

  chats = false;
  chatArray : Array<notificationOutInterface> = [];
  getChats()
  {
    console.log(this.currId);
    console.log("get chat notifications getting called")
    this.ns.getNotifications(this.currId).subscribe({
      next: (data)=>{
        this.chatArray = data;
        console.log(this.chatArray);
      },
      error: (err) => {console.log(err);},
      complete: () => {this.chats = true;}
    })
  }
}
