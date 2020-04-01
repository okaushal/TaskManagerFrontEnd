import { Component, OnInit, Inject } from '@angular/core';
import { TasksService } from '../../shared/tasks.service';
import { Observable } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Tasks } from '../../tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(public service: TasksService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public task: any) { }

  dataSaved= false;
  FinalMessage: string;
  taskupdateID: number;
  data: Tasks;

  ngOnInit(): void {
  }

  resetForm() {
    this.service.tform.reset();
    this.dataSaved = false;
    this.FinalMessage = null;
  }

  onFormSubmit() {
    this.dataSaved =false;
    const newTask = this.service.tform.value;
    this.AddTask(newTask);
    this.service.tform.reset();
    this.dialog.closeAll();
  }

  AddTask(task: Tasks)
  {
    this.taskupdateID = this.service.tform.get('QuoteID').value;
    // const data = this.service.getTasksbyId(this.taskupdateID);
    if(this.taskupdateID == null)
    {
      this.service.addTasks(task).subscribe(()=>
      {
        this.dataSaved = true;
        this.FinalMessage = 'Record Saved Successfully';
        this.service.tform.reset();
      })
    }
    else {
      this.service.updateTasks(task).subscribe(()=>
      {
        this.dataSaved = true;
        this.FinalMessage = "Record Updated Successfully";
        this.taskupdateID = null;
        this.service.tform.reset();
      })
    }
  }
}
