import { Component } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { GlobalComponent } from '../global/global.component';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  req_username:any;
  req_param:any;
  global:any;
  data: any;

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
      let url = "https://regres.in/api/users?page=1";
      this.data = this.http.get(url);
      this.data.subscribe((data: any)=>{
        console.log("response",data);
      })
    }

    async getStorageData(){}

    async ngOnInit(){
      await this.storage.create();

      // with storage
      this.getStorageData();
    }
}
