import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { groupInterface, groupOutInterface } from 'src/app/dashboard/dashboardEmpInterface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;
  
  constructor(private http: HttpClient) {
    this.dashBoardUrl = 'http://localhost:8080/group';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };

  //get group info by its id
  public getGroupById(groupId: String)
  {
    return this.http.get<groupOutInterface>(this.dashBoardUrl+`/${groupId}`, this.httpOptions);
  }

  //update group name
  public updateGroupName(groupId: String, newGroupName: String)
  {
    return this.http.put<any>(this.dashBoardUrl+`/updatename${groupId}`, newGroupName, this.httpOptions);
  }

  //add new empoyee to the group
  public addNewEmp(groupId:String, empIds: Array<String>)
  {
    return this.http.put<any>(this.dashBoardUrl+`/addemp${groupId}`, empIds, this.httpOptions);
  }

  //delete employees from the group
  public deleteEmpGroup(groupId:String, EmpIds:Array<String>)
  {
    return this.http.put<any>(this.dashBoardUrl+`/deleteemp${groupId}`, EmpIds, this.httpOptions);
  }
}
