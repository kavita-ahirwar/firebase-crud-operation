import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path:"",
  //   loadChildren:()=> import ('../app/authentication/authentication.module').then(m=>m.AuthenticationModule)
  // },
 {
  path:"",
  loadChildren:()=> import ('../app/components/components.module').then(m=>m.ComponentsModule)
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 constructor(){
  console.log('app-component')
 }
  
 }
