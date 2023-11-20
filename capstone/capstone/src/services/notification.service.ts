import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { notificationOutInterface} from 'src/app/notification/notificationInterface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;

  constructor(private http: HttpClient) { 
    this.dashBoardUrl = 'http://localhost:8080/notification';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };

  public getNotifications(Id:String)
  {
    return this.http.get<Array<notificationOutInterface>>(this.dashBoardUrl+`/getnot${Id}`, this.httpOptions);
  }
}
