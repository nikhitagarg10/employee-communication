import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from 'src/services/dashboard.service';
import { dashboardEmpInterface } from 'src/app/dashboard/dashboardEmpInterface';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreategroupComponent>, private ss: DashboardService) {}

  currentUserId:string="";
  ngOnInit(): void 
  {
    this.ss.getCurrentUser().subscribe({
      next: (data) => { this.currentUserId = data.userId; },
      error: (err) => { console.error(err); },
      complete: () => { this.showAllEmps(this.currentUserId); }
    });
  }

  newGroupForm: FormGroup = this.fb.group({
    group_name: new FormControl('', [Validators.required]),
    emps: ["", Validators.required]
  });

 

  allEmps: Array<dashboardEmpInterface> = [];
  //show all employyes present 
  showAllEmps(curId:String)
  {
    this.ss.GetAllEmps().subscribe({
      next: (data) => { this.allEmps= data.filter((d:any)=>{ return d.id !== curId;}); },
      error: (err) => { console.error(err); },
      complete: () => {}
    });
  }

  //selecting and deselecting the employees when creating a group
  selectedEmps:String[] = [];
  onCheckboxChange(e:Event) {
    if ((<HTMLInputElement>e.target).checked) {
      this.selectedEmps.push((<HTMLElement>e.target).id);
    } else {
      const index = this.selectedEmps.indexOf((<HTMLElement>e.target).id);
      if (index >= 0) {
        this.selectedEmps.splice(index, 1);
      }
    }

    this.newGroupForm.get('emps')?.patchValue(this.selectedEmps.slice());

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
