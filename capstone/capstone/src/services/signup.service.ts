import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUpInterface } from 'src/app/signup/signUpInterface';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signUpUrl: string;

  constructor(private http: HttpClient) {
    this.signUpUrl = 'http://localhost:8080/auth/createuser';
  }
  //sending login information to server
  public SigninEmp(signUpInfo: SignUpInterface){
    return this.http.post<any>(this.signUpUrl, signUpInfo);
  }
}
