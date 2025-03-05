import { Component, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalenderService } from 'src/services/calender.service';
import { DashboardService } from 'src/services/dashboard.service';
import { CalenderInterface } from './calenderInterface';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { CalendereventComponent } from 'src/shared/calenderevent/calenderevent.component';


@Component({
  selector: 'app-calender',
  styleUrls: ['./calender.component.css'],
  templateUrl: './calender.component.html',
})
export class CalenderComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  constructor(private fb: FormBuilder, private ss: CalenderService, 
            public dialog: MatDialog, private ds: DashboardService ){}

  ngOnInit(): void {
    this.getCurrUser();
  }

  currId = "";
  getCurrUser()
  {
      this.ds.getCurrentUser().subscribe({
        next: (data)=> {this.currId = data.userId},
        error: (err) => {console.log(err);},
        complete: () => {this.getAllEvents();}
      })     
  }

  calendarSmall: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true,
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
  };

  // calendarBigYear: CalendarOptions = {
  //   initialView: 'multiMonthYear',
  //   plugins: [multiMonthPlugin, interactionPlugin],
  //   dateClick: this.handleDateClick.bind(this),
  //   // headerToolbar: {
  //   //   left: 'prev',
  //   //   center: 'title',
  //   //   right: 'next'
  //   // },
  // };
  calendarOptions1: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, multiMonthPlugin, listPlugin, interactionPlugin],
    weekends: true,
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
  };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin, listPlugin, interactionPlugin], 
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      center: 'dayGridMonth,dayGridWeek,multiMonthYear,timeGridWeek,listWeek' 
    },
    // views: {
    //   timeGridFourDay: {
    //     type: 'timeGrid',
    //     duration: { days: 4 },
    //     buttonText: '4 day'
    //   }
    // }
  };

  // calendarBigDay: CalendarOptions = {
  //   plugins: [dayGridPlugin, interactionPlugin],
  //   initialView: 'dayGridWeek',
  //   headerToolbar: {
  //     left: 'prev,next',
  //     center: 'title',
  //     right: 'dayGridWeek,dayGridDay' 
  //   }
  // };

  // selectedView: string = 'Month'; 
  // currentCalenderView: String = "";
  // selectView(view: string) {
  //   this.selectedView = view; 
  //   console.error("selected calender view: "+ this.selectedView);
  //   if(view == "Day"){
  //     // this.currentCalenderView = "dayGridWeek";
  //     this.switchView("dayGridWeek");
  //   }
  //   else if (view == "Year"){
  //     // this.currentCalenderView = "multiMonthYear";
  //     this.switchView("multiMonthYear");
  //   }
  //   else if (view == "Month"){
  //     this.currentCalenderView = "dayGridMonth";
  //     this.switchView("dayGridMonth");
  //   }
  // }

  // switchView(view: string) {
  //   const calendarApi = this.calendarComponent.getApi();
  //   calendarApi.changeView(view); 
  // }

  opendialog(): void {
    const dialogRef = this.dialog.open(CalendereventComponent, {
      data: this.currId,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.calendarComponent.getApi().addEvent(result);
        this.ss.addEvent(result).subscribe({
          next:(data)=>{console.log(data)},
          error:(err)=>{console.log(err);},
          complete:()=>{this.getAllEvents();}
        });
      }
    });
  }
  

  allEvents: Array<CalenderInterface> = [];
  //get all events from database
  getAllEvents()
  {
    this.ss.getAllEvents(this.currId).subscribe({
      next:(data)=>{
        this.allEvents = data;},
      error:(err)=>{console.log(err);},
      complete:()=>{
        console.log(this.allEvents);
        this.calendarComponent.getApi().removeAllEvents();
        this.allEvents.forEach((e)=>{
          const eventdata = {
            "title": e.title,
            "start": new Date(e.start),
            "end": new Date(e.end),
          }
          this.calendarComponent.getApi().addEvent(eventdata);

          e.start = e.start.substring(0, e.start.indexOf('T'));
          e.end = e.end.substring(0, e.end.indexOf('T'));
        })

        if(this.date !== "")
        {
          console.log("called");
          this.filterEventsFunc();
        }
      }
    });
  }
  
  displayEvents = false;
  filterEvents: Array<CalenderInterface> = [];
  date: String = ""
  handleDateClick(args:any){
    this.date = args.dateStr;
    this.filterEventsFunc();
    this.displayEvents = true;
  };

  filterEventsFunc()
  {
    this.filterEvents = this.allEvents.filter((e)=>{
      if(this.date >= e.start && this.date <= e.end){
        return true;
      }
      return false;
    })
  }

  deleteEvent(id:String|undefined){
    if(id != undefined){
      this.ss.deleteEvent(id, this.currId).subscribe({
        next: (data)=>{console.log(data);},
        error: (err)=>{console.log(err)},
        complete: () => {
          this.getAllEvents();
        }
      })
    }
  }
  
  updateEvent(id:String|undefined)
  {
    
  }

   
   //icoms
   faPenToSquare = faPenToSquare
   faTrash = faTrash


}
