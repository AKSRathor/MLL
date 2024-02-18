import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiKeys } from 'src/app/ApiKeys';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  applicationName: string = "";
  ownerName: string = "";
  contactName: string = "";
  constructor(private http: HttpClient, private router: Router) { }
  @Output() keyCardAdd: EventEmitter<ApiKeys> = new EventEmitter();

  generateApiKey(length: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let apiKey = '';
    for (let i = 0; i < length; i++) {
      apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
  }
  handleOnCreateKey() {
    const apiKey = self.crypto.randomUUID();

    const headers = new HttpHeaders({
      'auth-token': localStorage.getItem('authtoken') || '',
      'Content-Type': 'application/json' 
    });
    this.http.post<any>('http://localhost:5000/aping/createkey', {
      "key": apiKey,
      "ownerName": this.ownerName,
      "contactNo": this.contactName,
      "applicationName": this.applicationName
    }, {headers}).subscribe({
      next: data => {
        // console.log(data)
        const todoCard = {
          key:apiKey,
          ownerName:this.ownerName,
          contactNo:this.contactName,
          applicationName:this.applicationName,
          secKey:"",
          updatedAt:""
          
        }
        this.keyCardAdd.emit(todoCard)
        
      },
      error: error => {
        console.error("There is an error", error)
      }
    })

  }


}
