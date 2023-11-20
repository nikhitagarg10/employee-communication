import { Injectable } from '@angular/core';
import { LoginInterface, LoginOutputInterface } from 'src/app/login/loginInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/auth/login';
  }
  //sending login information to server
  public LoginEmp(loginInfo: LoginInterface){
    return this.http.post<LoginOutputInterface>(this.loginUrl, loginInfo);
  }

  
}
