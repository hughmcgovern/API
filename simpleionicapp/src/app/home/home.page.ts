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

  constructor(
    public router:Router,
    public globalComponent:GlobalComponent,
    private storage:Storage,
    public http:HttpClient) 
    {
      this.global = this.globalComponent;
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
      let url = "https://reqres.in/api/users?page=1";
      this.data = this.http.get(url);
      this.data.subscribe(data=>{
        console.log("response",data);
      });
      console.log("hello from the data");

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
