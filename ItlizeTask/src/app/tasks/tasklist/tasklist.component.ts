import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../shared/tasks.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Tasks } from '../../tasks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  public displayedColumns = ['Contact', 'Task', 'DueDate', 'Actions'];

  dataSource: MatTableDataSource<any>;



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TasksService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(){
    this.getAllTasksData();
  }

  getAllTasksData(){
    // debugger
    // this.service.getAllTasks().subscribe(res => {
    //   this.dataSource.data = res as Tasks[];
    //   this.c = this.dataSource;
      //this.service.getAllTasks().subscribe(data => this.dataSource = new MatTableDataSource(data));
      this.service.getAllTasks().subscribe(
        list => {
          const array = list.map(item => {
            return {
              QuoteID: item.QuoteID,
              QuoteType: item.QuoteType,
              Contact: item.Contact,
              Task: item.Task,
              DueDate: item.DueDate,
              TaskType: item.TaskType
            };
          });
          this.dataSource = new MatTableDataSource(array);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource.data);
        });
  }

  public redirectToDetails = (id: string) => {

  }

  redirectToUpdate(quote: Tasks){
    this.service.tform.setValue(quote);
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width ='50%';
    this.dialog.open(TaskComponent, dialogconfig).afterClosed().subscribe(() => this.getAllTasksData());
  }
  

  redirectToDelete (id: string){
    if(confirm('Are you sure you want to delete this record?')){
      this.service.deleteTasks(id).subscribe(()=> {
        this.getAllTasksData();
        this.service.tform.reset();
      });
    }
  }

  onCreate(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width ='50%';
    this.service.tform.reset();
    this.dialog.open(TaskComponent, dialogconfig).afterClosed().subscribe(() => this.getAllTasksData());
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
