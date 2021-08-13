import { Injectable, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from '../models/user';
import { ApiserviceService } from './api-service.service';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class UserManagerServiceService  {

  currentUser: User;
   
  constructor(public storage: Storage, 
    public apiService: ApiserviceService,
     public platform: Platform) {
    console.log('-------- INIT UserManagerProviderService Provider --------- ');
    this.initStorage()
  }
  
  
  async initStorage() {
    console.log("==== INIT STORAGE ==========")
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  saveUser() {
    this.storage.set(this.apiService.appName + '_currentUser', this.currentUser);
  }

  setUser(user) {
    return new Promise(resolve => {
        let aUser = new User().initWithJSON(user);
        this.currentUser = aUser;
        console.log('User ID ' + aUser.id + ' email ' + aUser.email);
       this.storage.set(this.apiService.appName + '_currentUser', user).then(()=>{
          resolve(true)
        })
     });
  }


  getUser() {
    return new Promise(resolve => {
      this.storage.get(this.apiService.appName + '_currentUser').then((result) => {
        
        if (result) {
          let aUser = new User().initWithJSON(result);
          this.currentUser = aUser;
          resolve(this.currentUser)
        }
        else {
          this.currentUser=null
          resolve(null)
        }
      });
    });
  }

  logoutUser(){
    //To implement
    return new Promise(resolve => {

      resolve(true)
    })
    
  }
}