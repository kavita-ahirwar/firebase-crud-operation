import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/sign-in', pathMatch: 'full' 
  },
  
  {
    path:"sign-up",
    component:SignUpComponent
  },
  {
    path:"sign-in",
    component:SignInComponent
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent
  },
  {
    path:"verify-email",
    component:VerifyEmailComponent
  },
  
  {
    path:"dashboard", 
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"student-list",
    component:StudentListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'student-profile',
    component:StudentProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'student-add',
    component:AddStudentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"edit-student/:id",
    component:EditStudentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"delete-student",
    component:DeleteStudentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"**",
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
