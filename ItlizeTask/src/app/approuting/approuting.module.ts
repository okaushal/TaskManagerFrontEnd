import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from '../tasks/tasklist/tasklist.component';
import { DetailsComponent } from '../details/details.component';
import { SignupComponent } from '../user/signup/signup.component';
import { SigninComponent } from '../user/signin/signin.component';
import { UserComponent } from '../user/user.component';
import { AuthGuard } from '../auth/auth.guard';


export const routes: Routes = [
  { path: 'task', component: TasklistComponent, canActivate:[AuthGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { 
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignupComponent}]  
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SigninComponent}]
  },
  { path: '', redirectTo: '/login', pathMatch: 'prefix'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ApproutingModule { }
