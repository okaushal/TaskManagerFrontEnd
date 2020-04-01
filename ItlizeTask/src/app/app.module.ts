import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { TasksService } from './shared/tasks.service';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TasklistComponent } from './tasks/tasklist/tasklist.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailsComponent } from './details/details.component';
import { ApproutingModule } from './approuting/approuting.module';
import { SignupComponent } from './user/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './shared/user.service';
import { UserComponent } from './user/user.component';
import { routes } from './approuting/approuting.module';
import { SigninComponent } from './user/signin/signin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    TasklistComponent,
    DetailsComponent,
    SignupComponent,
    UserComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    ApproutingModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    MatSortModule
  ],
  providers: [HttpClientModule, TasksService, UserService, MatDatepickerModule, AuthGuard, TaskComponent, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [TasksComponent, TaskComponent, TasklistComponent, SignupComponent, SigninComponent]
})
export class AppModule { }
