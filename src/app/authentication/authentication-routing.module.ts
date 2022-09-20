import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';


const routes: Routes = [
  {
    path:"",
    component:AuthenticationComponent
  },
  // {
  //   path:"sign-up",component:SignUpComponent
  // },
  // {
  //   path:"sign-in",
  //   component:SignInComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
  constructor(){
    console.log('authentication:lazy loaded');
  }
}
