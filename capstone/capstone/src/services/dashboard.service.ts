import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { groupInterface, groupOutInterface } from 'src/app/dashboard/dashboardEmpInterface';
import { dashboardEmpInterface } from 'src/app/dashboard/dashboardEmpInterface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;
  
  constructor(private http: HttpClient) {
    this.dashBoardUrl = 'http://localhost:8080/home';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };
  private httpOptions1 = {
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };
  

  //sending a get request to get all the users when create group is clicked
  public GetAllEmps(){
    return this.http.get<Array<dashboardEmpInterface>>(this.dashBoardUrl+'/users', this.httpOptions);
  }

  //sending a get request to get the employee by id
  public getEmpById(empId:String){
    return this.http.get<any>(this.dashBoardUrl+`/userbyid${empId}`, this.httpOptions);
  }

  //sending a get request to get the current employee logged in
  public getCurrentUser(){
    console.log(this.httpOptions);
    return this.http.get<any>(this.dashBoardUrl+'/currentuser', this.httpOptions);
  }

  //sending post request to create a new group in database
  public createGroup(newGroup: groupInterface)
  {
    return this.http.post<groupInterface>(this.dashBoardUrl+'/newgroup', newGroup, this.httpOptions);
  }

  //get all groups present in the database
  public getAllGroups()
  {
    return this.http.get<Array<groupOutInterface>>(this.dashBoardUrl+"/allgroups", this.httpOptions);
  }

  //delete group by id
  public deleteGroupById(groupId: String)
  {
    return this.http.delete<any>(this.dashBoardUrl+`/delete${groupId}`, this.httpOptions);
  }


  private changeOccurred = new Subject<void>();
  public changeOccurred$ = this.changeOccurred.asObservable();
  public triggerChange(): void {
    this.changeOccurred.next();
  }


  //sttaus chnages
  public statusChange(newstatus: string, id:String)
  {
    return this.http.post(this.dashBoardUrl+`/statuschange${id}`, JSON.stringify(newstatus), this.httpOptions);
  }

  //image upload
  public uploadImage(image: File, id: String) {
    const formData = new FormData();
    console.log(formData);
    if(image)
    {
      formData.append('image', image, image.name);
      console.log(formData.get('image'));
    }
    return this.http.post(this.dashBoardUrl+`/addimage${id}`, formData, this.httpOptions1);
  }

  public getImage(id:String)
  {
    return this.http.get<any>(this.dashBoardUrl+`/getimage${id}`, this.httpOptions1)
  }
}
