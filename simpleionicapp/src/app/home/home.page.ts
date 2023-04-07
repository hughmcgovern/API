import { Component } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { GlobalComponent } from '../global/global.component';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  req_username:any;
  req_param:any;
  global:any;
  data: Observable<any> | undefined;
  total:any;
  total_pages:any;
  response: any[] | undefined;
  loading: boolean | undefined;
  loaded: boolean | undefined;
  record:any;
  record2:any;
  avatar:any;
  counter: any;

  constructor(
    public router:Router,
    public globalComponent:GlobalComponent,
    private storage:Storage,
    public http:HttpClient) 
    {
      this.global = this.globalComponent;
      this.counter = 0;
    }

    myVariable: string ="The force is with me!";
    myVariable2: string ="Hello from CCT";
    
    updateMyValue(){
      this.myVariable = "Now the force is even stronger!!";
    }
    updateMyValue2(){
      this.myVariable2 = "Hello from Ionic Mobile Development";
    }

    loadData(){
      this.loaded = true;
      this.loading = false;

      let url = "https://reqres.in/api/users?page=1";
      this.data = this.http.get(url);
      this.data.subscribe(data=>{
        console.log("response",data);
        this.total = data.total;
        this.total_pages = data.total_pages;
        this.record = data.data[0].first_name;
        this.record2 = data.data[0].last_name;
        this.avatar = data.data[0].avatar;
        console.log("total records:",this.total);
        console.log("total pages:",this.total_pages);
        console.log("this record:",this.record);
        console.log("this record:",this.record2);

        // putting in some delay here
        setTimeout(()=>{
          this.loaded=true;
          this.loading=false;
        },1000);


      });
      console.log("hello from the home.page.ts and data");
      
      

    }
    loadData2(){
      
      this.counter = this.counter +1;
      if(this.counter >=6){this.counter=0;}
      console.log("Counter:",this.counter);

      let url = "https://reqres.in/api/users?page=1";
      this.data = this.http.get(url);
      this.data.subscribe(data=>{
        console.log("response",data);
        this.record = data.data[this.counter].first_name;
        this.record2 = data.data[this.counter].last_name;
        this.avatar = data.data[this.counter].avatar;
      });     
      

    }

    async getStorageData(){
      let storage_username = await this.storage.get("username");
      console.log("storage_username",storage_username);
      this.req_username = storage_username;
      if(this.req_username == "" || this.req_username == undefined){
        this.req_username = "Guest";
      }
    }

    async ngOnInit(){
      await this.storage.create();

      // with storage
      this.getStorageData();
    }
  }
