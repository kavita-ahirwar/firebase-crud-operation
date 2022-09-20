import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'firebase/auth';
import { Student } from 'src/app/student';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  p: number = 1;

  Student!: Student[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

users:any=[];
keydata:any;

   constructor(public authService:AuthService,public toastr:ToastrService) { }

  ngOnInit(): void {

    this.dataState();
    
    let list = this.authService.GetStudentsList(); 
    list.snapshotChanges().subscribe(data => {
      console.log(data)
   
      this.Student = [];
      data.forEach(item => {
        let a:any= item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Student);
      })
    });
    
  }

  dataState() {     
    this.authService.GetStudentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    });

  }

  deleteStudent(Student:any) {
    if (window.confirm('Are sure you want to delete this student ?')) { 
      this.authService.DeleteStudent(Student.$key)
      this.toastr.success(Student.firstName + ' successfully deleted!');
    }
  }


  // getData() {
  //   debugger
  //   const db = getFirestore();
  //  }
 


  // getStudents() {
  //   this.users = this.db.collection('User').snapshotChanges().pipe(map(changes => {
  
  //   return changes.map(a => {
  //   const data: any = a.payload.doc.data();
  //   data.id = a.payload.doc.id;
  //   return data;
  //   });
  //   })
  //   );
  
  //   this.users.subscribe((result:any) => {
  //   console.log(result);
  //   this.users = result;
  //     //this.blogs_snapshot = res;
  //   }
  //   );
  
  //   }

}




