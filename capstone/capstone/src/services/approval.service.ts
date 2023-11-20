import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApprovalInterface } from 'src/app/approval/approvalInterface';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;
  
  constructor(private http: HttpClient) {
    this.dashBoardUrl = 'http://localhost:8080/admin';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };

  //admin approving the request
  public requestApproval(id:String)
  {
    return this.http.post<ApprovalInterface>(this.dashBoardUrl+'/confirm', id, this.httpOptions);
  }

  public getAllRequests()
  {
    return this.http.get<Array<ApprovalInterface>>(this.dashBoardUrl+'/get',  this.httpOptions)
  }
}
