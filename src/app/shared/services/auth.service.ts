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
        //  this.router.navigate(['/sign-in']);
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
          else{
            console.log("user not found."+user)
            window.alert('user not found.')
          }
        });
      })
      .catch((error) => {
        console.log(error)
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
     console.log(res)
    this.router.navigate(['dashboard']);
  }).catch((error)=>{
    
   console.log(error);
   window.alert("user not found..")
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
     
      console.log("user not found.."+error)
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



