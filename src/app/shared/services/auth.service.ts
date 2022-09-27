import { Injectable,NgZone } from '@angular/core';
import { User } from '../services/user';
import *as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { AngularFireDatabase,  AngularFireList,  AngularFireObject} from '@angular/fire/compat/database';
import {Router} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Student } from '../services/student';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  studentsRef!:AngularFireList<any>;
  studentRef!:AngularFireObject<any>;

  // datas!:AngularFireList <any>;
  data:any;

  constructor( 
    public afAuth:AngularFireAuth,
    public afs:AngularFirestore,
    public router:Router,
    public ngZone:NgZone,
    public db:AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        this.data=user;
        localStorage.setItem('user',JSON.stringify(this.data));
        JSON.parse(localStorage.getItem('user')!);
      }
      else{
        localStorage.setItem('user','null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })

   }

   SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email:string, password:string){
    debugger
  return this.afAuth.createUserWithEmailAndPassword(email,password).then((result)=>
  {
    this.SendVerificationMail();
    this.setUserData(result.user);
  })
  .catch((error)=>{
    window.alert(error.message)
  });
}

SendVerificationMail() {
  return this.afAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    });
}


ForgotPassword(passwordResetEmail: string) {
  return this.afAuth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
      window.alert(error);
    });
}


get isLoggedIn():boolean{
const user = JSON.parse(localStorage.getItem('user')!);
return user !== null && user.emailVerified !==false ? true : false;
}



GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
    this.router.navigate(['dashboard']);
  });
}
// Auth logic to run auth providers
AuthLogin(provider: any) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['dashboard']);
      this.setUserData(result.user);
    })
    .catch((error) => {
      window.alert(error);
    });
}


// list

getUsers(){
  return new Promise<any>((resolve, reject) => {
    this.afs.collection('/people').snapshotChanges()
    .subscribe(snapshots => {
      resolve(snapshots)
    })
  })
}


// getStudents() {
  
//   this.data = this.afs.collection('users').snapshotChanges().pipe(map(changes => {

//   return changes.map(a => {
//   const data: any = a.payload.doc.data();
//   console.log(data)
//   return data;
//   });
//   })
//   );

//   this.data.subscribe((result:any) => {
//   console.log(result);
//   this.data = result;
//     //this.blogs_snapshot = res;
//   }
//   );

//   }

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }


  //fet student data
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }


 // Update Student Object
 UpdateStudent(student: Student) {
  this.studentRef.update({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    mobileNumber: student.mobileNumber,
  });
}


// Create Student
AddStudent(student:Student){
  this.studentsRef.push({
    firstName:student.firstName,
    lastName:student.lastName,
    email:student.email,
    mobileNumber:student.mobileNumber,
    
  });
 }

// Delete Student Object
DeleteStudent(id: string) {
  this.studentRef = this.db.object('students-list/' + id);
  this.studentRef.remove();
}


// GetStudentsList() {
//   debugger
//   this.datas = this.db.list('students-list');
//   return this.datas;
// }

  setUserData(user:any){

     const userRef:AngularFirestoreDocument<any>=this.afs.doc(`users/${user.userId}`);
     const data:User={
      // userId:user.userId,
      // name:user.name,
      // email:user.email,
      // password:user.password,
      // mobile:user.mobile,
      // address:user.address
      // image:user.image
   
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      // emailVerified:user.emailVerified
     }
     return userRef.set(data,{merge:true});
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      
    });
  }
}


// if(confirm('r u sure?')){
//   localStorage.removeItem('user');
//   this.router.navigate(['/sign-in']);
//   }




  //   data: any;
//   loginForm: FormGroup = new FormGroup({
//     userName: new FormControl(''),
//     email: new FormControl(''),
//     mobile: new FormControl(''),
//     password: new FormControl(''),
//     confirmpwd: new FormControl(''),
//     photoURL: new FormControl('')
//   });
//   submitted: boolean = false;
//   constructor(public auth: AuthService, public fb: FormBuilder) {}
//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       userName: ['', Validators.required],
//       email: ['', Validators.required],
//       mobile: ['', Validators.required],
//       password: ['', Validators.required],
//       confirmpwd: ['', Validators.required],
//       photoURL: ['', Validators.required]
//     })
//   }
//   get f(): { [key: string]: AbstractControl } {
//     return this.loginForm.controls;
//   }
//   onSubmit() {
//     this.submitted = true;
//     if (this.loginForm.invalid) {
//       return;
//     }
//     this.data = this.loginForm.value;
//     let cid = Math.floor(100000 + Math.random() * 900000);
//     console.log(cid);
//     this.data.userId = cid;
//     this.data.emailVerified = false;
//     console.log(this.data);
//     this.auth.signUp(this.data.email, this.data.password).then(res => {
//       window.alert('data has been set')
//     }).catch(error => {
//       window.alert('Unable to set data');
//     })
//   }
//   reset() {
//     this.submitted = false;
//     this.loginForm.reset();
//   }
// }
  

//kavita

// data: any;
// constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,
//   public router: Router, public ngZone: NgZone) {
//   this.afAuth.authState.subscribe((user) => {
//     if (user) {
//       this.data = user;
//       localStorage.setItem('user', JSON.stringify(this.data));
//       JSON.parse(localStorage.getItem('user')!);
//     }
//     else {
//       localStorage.setItem('user', 'null');
//       JSON.parse(localStorage.getItem('user')!);
//     }
//   })
// }
// signIn(email: string, password: string) {
//   return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
//     this.setUserData(result.user);
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
//         this.router.navigate(['/dashboard']);
//       }
//     })
//   })
//     .catch((error) => {
//       window.alert(error.message);
//     })
// }
// signUp(email:string, password:string){
//   return this.afAuth.createUserWithEmailAndPassword(email,password).then((result)=>
//   {
//     this.sendVerificationMail();
//     this.setUserData(result.user);
//   })
//   .catch((error)=>{
//     window.alert(error.message)
//   });
// }
// sendVerificationMail(){
// return this.afAuth.currentUser.then((u:any)=>u.sendEmailVerification()).then(()=>{
//   this.router.navigate(['/verify-email']);
// });
// }
// forgotPassword(resetEmail:string){
// return this.afAuth.sendPasswordResetEmail(resetEmail).then(()=>{
//   window.alert("Password reset email has been sent,Please check your inbox.");
// })
// .catch((error)=>{
//   window.alert(error);
// })
// }
// get isLoggedIn():boolean{
// const user = JSON.parse(localStorage.getItem('user')!);
// return user !== null && user.emailVerified !==false ? true : false;
// }
// GoogleAuth(){
// return this.authLogin(new auth.GoogleAuthProvider()).then((res: any)=>{
//   this.router.navigate(['/dashboard']);
// });
// }
// authLogin(provider: any){
// return this.afAuth.signInWithPopup(provider).then((result)=>{
//   this.router.navigate(['/dashboard']);
//   this.setUserData(result.user)
// })
// .catch((error)=>{
//   window.alert(error);
// })
// }
// setUserData(user:any){
// const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//   `users/${user.userId}`
// );
// const data:User = {
//   userId: user.userId,
//   userName: user.userName,
//   email: user.email,
//   password: user.password,
//   mobile: user.mobile,
//   photoURL: user.photoURL,
//   emailVerified: user.emailVerified
// };
// return userRef.set(data,{merge:true})
// }
// signOut(){
// return this.afAuth.signOut().then(()=>{
//   localStorage.removeItem('user');
//   this.router.navigate(['/sign-in']);
// })
// }
// }


