import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  PasswordPattern = "[A-za-z0-9$@*]{6,}$";

  constructor(private userservice: UserService, private router: Router , private toaster: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.reset();
    }
    else{
      this.user = {
        Email: '',
        Password: '',
        ConfirmPassword: ''
      }
    }
  }

  OnSubmit(form: NgForm){
    this.userservice.registerUser(form.value).subscribe(() => {
      this.resetForm(form);
      this.router.navigateByUrl('/login');
    });
  }

}
