import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  ID: number;
  QuoteID: number;
  QuoteType: string;
  Contact: string;
  Task: string;
  TaskType: string;
  DueDate: Date;

  constructor(private service: TasksService, private data: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.ID = Number(this.data.snapshot.paramMap.get('id'));
    this.service.getTasksbyId(this.ID).subscribe(task => {
      this.QuoteType = task.QuoteType;
      this.Contact = task.Contact;
      this.TaskType = task.TaskType;
      this.Task = task.Task;
      this.DueDate = task.DueDate;
    });
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
