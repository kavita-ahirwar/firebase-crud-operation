import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  registerForm: FormGroup | any;

  submitted = false;

  email!: any;
  password!: any;
 

  constructor(public authService:AuthService,private fromBuilder:FormBuilder) { 
    
  }


  ngOnInit(): void {
    this.registerForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9._%+-]")]],
     
    })
  }

  get f() {
    return this.registerForm.controls;
  }


  Signin(){
    this.submitted = true
    if (this.registerForm.invalid) {
      for (const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }
      return;
    }
    this.authService.SignIn(this.registerForm.value.email,this.registerForm.value.password).then((result:any)=>{
      if(result){
        window.alert("signin success");
      }
     
    }).catch(err=>{
      window.alert("Error"+err);
    })
  }


}
