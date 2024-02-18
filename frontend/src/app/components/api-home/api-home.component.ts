import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiKeys } from 'src/app/ApiKeys';

@Component({
  selector: 'app-api-home',
  templateUrl: './api-home.component.html',
  styleUrls: ['./api-home.component.css']
})
export class ApiHomeComponent implements OnInit {
addKeyCard(keyCard: ApiKeys) {

  this.apiHome.unshift(keyCard)
  
}
handleOnGenSecKey(keyVal: string) {

  const headers = new HttpHeaders({
    'auth-token': this.tokeVal || '', // Ensure a default value if authtoken is null
    'Content-Type': 'application/json' // 'content-type' changed to 'Content-Type'
  });
  const body =  {
    passKey:keyVal
  
  }

  this.http.put<any>('http://localhost:5000/aping/generateseckey',body, { headers }).subscribe({
      next: data => {
        console.log(data)
        navigator.clipboard.writeText(data.secKeyIs)
      },
      error: error => {
        console.error("There is an error", error)
      }
  })
  
}

  apiHome: ApiKeys[] = [];
  tokeVal: string = `${localStorage.getItem("authtoken")}`;
  
  constructor(private http: HttpClient, private router: Router) {
    const headers = new HttpHeaders({
      'auth-token': this.tokeVal || '', // Ensure a default value if authtoken is null
      'Content-Type': 'application/json' // 'content-type' changed to 'Content-Type'
    });
    // const body = {  };

    console.log(localStorage.getItem('authtoken'))

    this.http.post<any>('http://localhost:5000/aping/fetchKeys',{}, { headers }).subscribe({
      next: data => {
        console.log(data)

        this.apiHome = data.allKey
        // this.apiHome.sort(function(a,b){
        //   return new Date(b.updatedAt) - new Date(a.updatedAt);
        // });
        
      },
      error: error => {
        console.error("There is an error", error)
      }
    })

  }


  handleOnCopyClick(keyVal:string) {
    navigator.clipboard.writeText(keyVal)
  }

  ngOnInit() {

  }



}