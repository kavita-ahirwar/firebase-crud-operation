import { Component, OnInit } from '@angular/core';
// import {SidebarModule} from 'primeng/sidebar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
display!: boolean;

  constructor( public authService:AuthService) { }

  ngOnInit(): void {
  }
  logOut(){
    if(confirm("Are you Sure ?")){
      this.authService.SignOut();
    }
  }

}
