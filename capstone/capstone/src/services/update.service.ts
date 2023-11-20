import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;
  
  constructor(private http: HttpClient) {
    this.dashBoardUrl = 'http://localhost:8080/update';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };

  //request admin to approve the chnage request
  public requestApproval(id:String, type:String, newValue:String)
  {
    console.log("request approval service function")
    return this.http.post<void>(this.dashBoardUrl+`/${id}/${type}`, newValue, this.httpOptions);
  }
}
