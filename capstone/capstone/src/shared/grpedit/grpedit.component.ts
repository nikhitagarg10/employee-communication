import { Component, Inject } from '@angular/core';
import { FormBuilder , FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dashboardEmpInterface } from 'src/app/dashboard/dashboardEmpInterface';
import { DashboardService } from 'src/services/dashboard.service';
import { GroupService } from 'src/services/group.service';
import { groupMembers } from 'src/app/group/groupInterface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-grpedit',
  templateUrl: './grpedit.component.html',
  styleUrls: ['./grpedit.component.css']
})
export class GrpeditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public grpMem: Array<groupMembers> , private fb: FormBuilder, public dialogRef: MatDialogRef<GrpeditComponent>,
              private ss: DashboardService, private gs: GroupService) {}

  currentUserId:string="";
  ngOnInit(): void 
  {
    this.ss.getCurrentUser().subscribe({
      next: (data) => { this.currentUserId = data.userId; },
      error: (err) => { console.error(err); },
      complete: () => { this.notGrpEmpsFunc(this.currentUserId); }
    });
  }

  updateForm: FormGroup = this.fb.group({
    group_name: new FormControl(''),
    emps: new FormControl('')
  });

  allEmps: Array<dashboardEmpInterface> = [];
  notGrpEmps: Array<dashboardEmpInterface> = [];
  flag = true;
  notGrpEmpsFunc(curId: String)
  {
      this.ss.GetAllEmps().subscribe({
        next: (data) => { console.log(this.grpMem); this.allEmps= data.filter((d:any)=>{ 
           this.flag = true;
            this.grpMem.forEach((g)=>{
              if(g.id == d.id){
                this.flag = false;
              }
            })
            if(this.flag){
              this.notGrpEmps.push(d);
            }
          }); 
        },
        error: (err) => { console.error(err); },
        complete: () => { }
      });
  }

  
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

    this.updateForm.get('emps')?.patchValue(this.selectedEmps.slice());

  }
 

  onNoClick(): void {
    this.dialogRef.close();
  }
}
