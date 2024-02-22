import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { KeypageService } from 'src/app/services/keypage/keypage.service';
import { MenuItem } from 'primeng/api';
import { ApiLogs } from 'src/app/ApiLogs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-api-logs',
  templateUrl: './api-logs.component.html',
  styleUrls: ['./api-logs.component.css']
})
export class ApiLogsComponent {
  
visible: boolean = false;
reqDataObj: any;
myTempReqArr:any;

showDialogReqData(myreqData:string) {
  this.visible = true
  this.reqDataObj = JSON.parse(myreqData)
  console.log(this.reqDataObj, "is requested data")
}
  getColumns(data: any[]): string[] {
    const columns: string[] = [];
    data.forEach(row => {
      Object.keys(row).forEach(col => {
        if (!columns.includes(col)) {
          columns.push(col);
        }
      });
    });
    return columns;
  }

  handleOnDownloadFile() {
    const columns = this.getColumns(this.apiLogs);
    console.log(columns)
    const worksheet = XLSX.utils.json_to_sheet(this.apiLogs, { header: columns });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');

  }

  apiLogs: ApiLogs[] = [];
  tokeVal: string = `${localStorage.getItem("authtoken")}`;
  value: any;
  apiMenuFilter: Boolean = false
  handleOnToggleApiMenu() {
    this.apiMenuFilter = !this.apiMenuFilter
  }

  constructor(private http: HttpClient, private router: Router, public keypage: KeypageService, private messageService: MessageService) {

    const headers = new HttpHeaders({
      'auth-token': this.tokeVal || '', // Ensure a default value if authtoken is null
      'Content-Type': 'application/json' // 'content-type' changed to 'Content-Type'
    });
    // const body = {  };

    console.log(localStorage.getItem('authtoken'))

    this.http.post<any>('http://localhost:5000/aping/fetchLogs', {}, { headers }).subscribe({
      next: data => {
        console.log(data)

        this.apiLogs = data.allLogs

      },
      error: error => {
        console.error("There is an error", error)
      }
    })

  }

  selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'APIs', key: 'A' },
    { name: 'Response Data', key: 'M' },
    { name: 'Time', key: 'P' },
    { name: 'Application Name', key: 'R' }
  ];





}
