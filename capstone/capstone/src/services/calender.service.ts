import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalenderInterface } from 'src/app/calender/calenderInterface';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;
  
  constructor(private http: HttpClient) { 
    this.dashBoardUrl = 'http://localhost:8080/calender';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };

  public getAllEvents(currId:String)
  {
    return this.http.get<Array<CalenderInterface>>(this.dashBoardUrl+`/get${currId}`, this.httpOptions);
  }

  public addEvent(cal: CalenderInterface)
  {
    return this.http.post<Array<CalenderInterface>>(this.dashBoardUrl+`/add`, cal, this.httpOptions);
  }

  public deleteEvent(id: String, currId:String)
  {
    return this.http.delete<any>(this.dashBoardUrl+`/delete${id}/${currId}`,this.httpOptions);
  }

}
