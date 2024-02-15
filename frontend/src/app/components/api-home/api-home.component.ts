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
  apiHome: ApiKeys[] = [];
  constructor(private http: HttpClient, private router: Router) {
    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('authtoken') || '', // Ensure a default value if authtoken is null
      'Content-Type': 'application/json' // 'content-type' changed to 'Content-Type'
    });
    const body = {  };

    console.log(localStorage.getItem('authtoken'))

    this.http.post<any>('http://localhost:5000/aping/fetchKeys',body, { headers }).subscribe({
      next: data => {
        console.log(data)
        this.apiHome = data.allKey
      },
      error: error => {
        console.error("There is an error", error)
      }
    })

  }
  ngOnInit() {

  }



}