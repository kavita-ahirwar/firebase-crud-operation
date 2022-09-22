import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarModule} from 'primeng/sidebar';

import { ComponentsRoutingModule } from './components-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import {CardModule} from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { StudentListComponent } from './student-list/student-list.component';
import {PaginatorModule} from 'primeng/paginator';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ToastrModule } from 'ngx-toastr';
import { PrimeIcons } from 'primeng/api';
import {MatIconModule} from '@angular/material/icon';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
// import { PrimeIcons} from 'primeng/api';



@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    StudentListComponent,
    StudentProfileComponent,
    AddStudentComponent,
    EditStudentComponent,
    DeleteStudentComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    PaginatorModule,
    MatIconModule,
    

    ToastrModule.forRoot()
  ],
  exports:[DashboardComponent]
})
export class ComponentsModule { }
