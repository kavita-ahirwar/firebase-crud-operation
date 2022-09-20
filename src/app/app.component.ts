import { Component ,OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PrimeNG';
 
  // gfg!:MenuItem[];
  constructor(private primengconfig:PrimeNGConfig){}

 ngOnInit(){
  this.primengconfig.ripple=true;

  // this.gfg=[]
 }

}
