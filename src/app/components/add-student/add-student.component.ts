import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm!:FormGroup;
  submitted:boolean=false;

  // firstName:any;
  // email:any;
  // password:any;
  // lastName:any;
  // mobileNumber:any;

  constructor(public authService:AuthService,
    public fb:FormBuilder,
    public toastr:ToastrService,public router:Router) { 
  
  }

  ngOnInit(): void {
    this.authService.GetStudentsList();
    this.form();
  }

  form(){
    this.studentForm=this.fb.group({
      firstName :['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
       email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
       lastName:['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      //  password: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9._%+-]")]],
       mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
     });
  }


  get f(){
    return this.studentForm.controls;
  }

  ResetForm() {
    this.studentForm.reset();
  }

 submitStudentData(){
  this.submitted = true
    if (this.studentForm.invalid) {
      for (const control of Object.keys(this.studentForm.controls)) {
        this.studentForm.controls[control].markAsTouched();
      }
      return;
    }
  console.log(this.studentForm.value)

  this.authService.AddStudent(this.studentForm.value);
  console.log(this.studentForm.value);

  this.toastr.success(
    this.studentForm.controls['firstName'].value + ' successfully added!'
  );
   this.router.navigate(['/student-list'])

  }
}
