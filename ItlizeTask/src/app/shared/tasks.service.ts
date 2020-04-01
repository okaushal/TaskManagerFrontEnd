import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { Tasks } from '../tasks';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = 'https://localhost:44372/api/value';

  constructor(private http: HttpClient) { }

  // public getAllTasks = () => {
  //   return this.http.get(this.url + '/Get');
  // }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.url + '/Get');
  }

  getTasksbyId(taskId: number): Observable<Tasks> {
    return this.http.get<Tasks>(this.url + '/Get/' + taskId);
  }

  addTasks(quote: Tasks): Observable<Tasks> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post<Tasks>(this.url + '/Post/' , quote, httpOptions);
  }

  updateTasks(quote: Tasks): Observable<Tasks> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.put<Tasks>(this.url + '/Put/' +   quote.QuoteID , quote, httpOptions);
  }

  deleteTasks(taskId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.delete<number>(this.url + '/Delete?id=' + taskId, httpOptions);
  }

  tform: FormGroup = new FormGroup({
    QuoteID: new FormControl(null),
    QuoteType: new FormControl('', Validators.required),
    Contact: new FormControl('', Validators.required),
    Task: new FormControl('', Validators.required),
    DueDate: new FormControl('', Validators.required),
    TaskType: new FormControl('', Validators.required),
  });
}
