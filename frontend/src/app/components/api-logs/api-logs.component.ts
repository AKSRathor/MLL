import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { KeypageService } from 'src/app/services/keypage/keypage.service';
import { MenuItem } from 'primeng/api';
import { ApiLogs } from 'src/app/ApiLogs';
import * as XLSX from 'xlsx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-api-logs',
  templateUrl: './api-logs.component.html',
  styleUrls: ['./api-logs.component.css']
})
export class ApiLogsComponent implements OnInit {

  

  getApiLog(){
    

  }

visible: boolean = false;
// reqDataObjKey: any;
reqDataObj: any;
reqDataObjArr:{
  dt:string,
  vl:string
}[]= [];


myTempReqArr:any;

showDialogReqData(myreqData:string) {
  this.reqDataObjArr = []
  this.visible = true
  this.reqDataObj = JSON.parse(myreqData)
  for (let i = 0; i < Object.keys(this.reqDataObj).length; i++) {
    
    let obj = {
      dt: Object.keys(this.reqDataObj)[i],
      vl: `${Object.values(this.reqDataObj)[i]}`,
    }

    this.reqDataObjArr.push(obj)
  }
  console.log(this.reqDataObjArr)
  
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

  constructor(private http: HttpClient, private router: Router, public keypage: KeypageService, private messageService: MessageService, public websocketservice: WebsocketService) {


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


  ngOnInit() {
    
    this.keypage.pageNav = 1
    this.websocketservice.listen("testevent").subscribe((data)=>{
      console.log(data)
    })

  }




}
