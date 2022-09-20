import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';





@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup | any;
  submitted = false;


  // name!: string;
  // email!: string;
  password!: string;
  mobile!: string;
  // address!: string;
  // image!:string;

  displayName!:string;
  email!: string;
  photoURL!:string;
  uid!:string;
  emailVerified!:boolean;

  data: any;
  userId: any;
  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      displayName :['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      photoURL:['',Validators.required],
      password: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9._%+-]")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // image: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      // address: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      // uid:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // emailVerified:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]]

    })
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
   
    this.submitted = true
    if (this.registerForm.invalid) {
      for (const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }
      return;
    }
   
    this.data = this.registerForm.value;
    console.log(this.data);
    let id = Math.floor(100000 + Math.random() * 900000);
    console.log(id)
    this.data.userId = id;
    this.data.emailVerified = true;
    this.authService.signUp(this.registerForm.value.email,this.registerForm.value.password).then(data => {
      console.log(data);
      window.alert("Data saved");
    }).catch(err=>{
      window.alert(err);
    })
  }

  // signUp(email:string,password:string){
  // this.authService.SignUp(email,password).subscribe((data)=>{})
  // }
}
