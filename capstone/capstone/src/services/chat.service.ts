import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageInterface, MessageOutInterface } from 'src/app/chat/chatInterface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dashBoardUrl: string;
  private jwtToken = localStorage.getItem("access_token");
  private headers: any;

  constructor(private http: HttpClient) { 
    this.dashBoardUrl = 'http://localhost:8080/chat';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    })
  };

  public saveMessage(mes:MessageInterface)
  {
    return this.http.post<MessageOutInterface>(this.dashBoardUrl+'/sendmessage', mes, this.httpOptions);
  }

  public getMessages(senderId:String, receiverId:String)
  {
    return this.http.get<Array<MessageOutInterface>>(this.dashBoardUrl+`/getmessages${senderId}/${receiverId}`, this.httpOptions);
  }
}
