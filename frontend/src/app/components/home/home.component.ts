import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
navigateViewLogs() {
  this.router.navigate(["home/keylogs"])
}
navigateCreateKeys() {
  this.router.navigate(["home/createkey"])
}

  constructor(private router:Router){
    
  }
  items: MenuItem[] = [];
 

}
