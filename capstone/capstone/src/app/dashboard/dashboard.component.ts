import { Component } from '@angular/core';
import { faCalendarDays, faComment, faBell, faAddressBook, faThumbsUp} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  constructor(){}

  isAdmin = localStorage.getItem("isAdmin");
  //icons
  faCalendarDays = faCalendarDays;
  faComment = faComment;
  faAddressBook = faAddressBook;
  faBell = faBell;
  faThumbsUp = faThumbsUp;
}
