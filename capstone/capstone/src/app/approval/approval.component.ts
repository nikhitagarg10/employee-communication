import { Component, OnInit } from '@angular/core';
import { ApprovalInterface } from './approvalInterface';
import { ApprovalService } from 'src/services/approval.service';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit{
  
  constructor(private as: ApprovalService){}

  approvals: Array<ApprovalInterface> = [];
  ngOnInit(): void {
    this.getAllRequest();
  }
  
  getAllRequest()
  {
    this.as.getAllRequests().subscribe({
      next: (data) => {
        this.approvals = data;
        this.approvals = this.approvals.filter((a)=>{
          if(a.status===false){return true;}
          return false;
        })
      },
      error: (err) => {console.log(err);},
      complete: () => {}
    });
   }

   approveRequest(id: String)
   {
    this.as.requestApproval(id).subscribe({
      next: (data) => {console.log(data);},
      error: (err) => {console.log(err);},
      complete: () => {
        this.getAllRequest();
      }
    });
   }

   faCheck = faCheck;

}
