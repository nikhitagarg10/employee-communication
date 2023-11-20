import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;

  constructor(private http: HttpClient) {
    this.profileUrl = 'http://localhost:8080/auth';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };
  

  //changing the password
  public changePassword(id:String, password:Array<String>)
  {

    return this.http.post<any>(this.profileUrl+`/password${id}`, password, this.httpOptions)
  }
}
