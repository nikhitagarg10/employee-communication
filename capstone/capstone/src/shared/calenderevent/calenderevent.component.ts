import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calenderevent',
  templateUrl: './calenderevent.component.html',
  styleUrls: ['./calenderevent.component.css']
})
export class CalendereventComponent {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CalendereventComponent>,
              @Inject(MAT_DIALOG_DATA) public currId: String) {}

  //creating a new event
  addEventForm = this.fb.group({
    empId: [this.currId],
    title: ['', Validators.required],
    start: ["", Validators.required],
    end: ["", Validators.required],
    category: ["", Validators.required],
    description: [""]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
