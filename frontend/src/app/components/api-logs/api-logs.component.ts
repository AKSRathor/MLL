import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { KeypageService } from 'src/app/services/keypage/keypage.service';

@Component({
  selector: 'app-api-logs',
  templateUrl: './api-logs.component.html',
  styleUrls: ['./api-logs.component.css']
})
export class ApiLogsComponent {

  apiLogs: [] = [];
  tokeVal: string = `${localStorage.getItem("authtoken")}`;

  constructor(private http: HttpClient, private router: Router, public keypage: KeypageService, private messageService: MessageService) {

    const headers = new HttpHeaders({
      'auth-token': this.tokeVal || '', // Ensure a default value if authtoken is null
      'Content-Type': 'application/json' // 'content-type' changed to 'Content-Type'
    });
    // const body = {  };

    console.log(localStorage.getItem('authtoken'))

    this.http.post<any>('http://localhost:5000/aping/fetchKeys',{}, { headers }).subscribe({
      next: data => {
        console.log(data)

        this.apiLogs = data.allKey
        // this.apiHome.sort(function(a,b){
        //   return new Date(b.updatedAt) - new Date(a.updatedAt);
        // });
        
      },
      error: error => {
        console.error("There is an error", error)
      }
    })

  }

}
