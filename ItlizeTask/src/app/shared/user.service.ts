import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'https://localhost:44372';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User>{
    const body: User = {
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True'})};
    return this.http.post<User>(this.rootUrl + '/api/Account/Register', body, httpOptions);
  }

  userAuthentication(username, password) {
    var data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
}
