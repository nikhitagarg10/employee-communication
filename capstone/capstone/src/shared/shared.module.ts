import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { GrpeditComponent } from './grpedit/grpedit.component';
import { CalendereventComponent } from './calenderevent/calenderevent.component';


@NgModule({
  declarations: [
    CreategroupComponent,
    GrpeditComponent,
    CalendereventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
