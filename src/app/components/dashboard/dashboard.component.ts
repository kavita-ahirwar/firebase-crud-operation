import { Component, OnInit } from '@angular/core';
// import {SidebarModule} from 'primeng/sidebar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
display!: boolean;

  constructor( public authService:AuthService , private route:Router) { }

  ngOnInit(): void {
  }
  logOut(){
    if(confirm("Are you Sure ?")){
      this.authService.SignOut();
    }
  }

  profile()
  {
     this.route.navigate(['/student-profile']).then( ()=>{
      window.location.reload();
     });
  }

}
