import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLoginError: boolean = false;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(userName, password){
    this.service.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/task']);
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}
