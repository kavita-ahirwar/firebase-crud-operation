import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  editForm!: FormGroup;
  submitted: boolean = false;

  constructor(private atuhService: AuthService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.editForm= this.fb.group({
    //   firstName :['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    //    email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    //    lastName:['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    //    password: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9._%+-]")]],
    //    mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    // });


    this.updateStudentData();
    const id = this.actRoute.snapshot.paramMap.get('id')!;
    this.atuhService
      .GetStudent(id)
      .valueChanges()
      .subscribe((data) => {
        console.log(data)
        this.editForm.setValue(data);
      });
  }


  updateStudentData() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      // password: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9._%+-]")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }

  get f() {
    return this.editForm.controls;
  }

  updateForm() {
    //   this.submitted = true
    //   if (this.editForm.invalid) {
    //     for (const control of Object.keys(this.editForm.controls)) {
    //       this.editForm.controls[control].markAsTouched();
    //     }
    //     return; 
    //   }
    // console.log(this.editForm.value)

    this.atuhService.UpdateStudent(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['firstName'].value + ' updated successfully'
    );
    this.router.navigate(['/student-list']);

  }

  goBack(){
    this.location.back();
  }

}
