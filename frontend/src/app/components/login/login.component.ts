import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // animations:[
  //   trigger('animatingBtn',[
  //     transition('void => *',[
  //       // style({width:"0%"}),
  //       animate('0.4s', style({width:"0%"}))
  //       // animate("0.4s")
  //     ] ),
  //     transition('* => void', [
  //       // style({width:"100%"}),
  //       animate('0.4s', style({width:"100%"}))
  //       // animate('0.4s')
  //     ])
  //   ]
  //   )
  // ]
})
export class LoginComponent {
  username: string = ""
  password: string = ""
  handleOnLogin() {
    console.log("cliccked")
    this.http.post<any>('http://localhost:5000/user/login', {
      "username": this.username,
      "password": this.password
    }).subscribe({
      next: data => {
        console.log(data)
        if(data.success){
          localStorage.setItem("authtoken", data.authtoken)
          this.router.navigate(['home'])
        }
      },
      error:error=>{
        console.error("There is an error", error)
      }
    })
    
  }
  constructor(private http: HttpClient, private router:Router) { }
  handleHoverSubmit() {
    console.log("Hovering")
  }
  




}
