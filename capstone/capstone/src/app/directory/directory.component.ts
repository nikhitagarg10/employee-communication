import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from 'src/services/dashboard.service';
import { dashboardEmpInterface } from '../dashboard/dashboardEmpInterface';
import {MatPaginator} from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})

export class DirectoryComponent implements OnInit{

  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(private ss: DashboardService) {}
  dataSource: any;

  
  ngOnInit(): void {
    this.getAllEmps();
  }

  empData : Array<dashboardEmpInterface> = [];
  empDataLen: NumberInput = 0;
  getAllEmps()
  {
    this.ss.GetAllEmps().subscribe({
      next: (data) => {
        this.empData = data;
        this.empDataLen = this.empData.length;
        this.dataSource = new MatTableDataSource(this.empData);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {},
      complete: () => {}
    })
  }

  displayedColumns: string[] = [ 'name', 'email', 'phone', 'department', 'role', 'status'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
