import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { User } from './models/user';
import { ApiserviceService } from './services/api-service.service';
import { UserManagerServiceService } from './services/user-manager-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public platform: Platform,
    public apiService: ApiserviceService,
    public userService: UserManagerServiceService) {
    // When application launchs for first time
    this.userService.getUser().then((user: User) => {
      if (user) {
        this.setActiveAndLastDate(user)
      }
    })
    this.initApplication()
  }


  initApplication() {
    // App already launches and state change 
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        console.log("Application is foreground")
        this.userService.getUser().then((user: User) => {
          if (user) {
            this.setActiveAndLastDate(user)
          }
        })

      }
      else {
        console.log("Application is background ")
        this.userService.getUser().then((user: User) => {
          if (user) {
            this.setInactive(user)
          }
        })
      }
    });
  }

  setActiveAndLastDate(user: User) {
    if (this.apiService.networkConnected) {
      console.log("==Envoi online pour user ",user.id)
      console.log(user)
        this.apiService.showLoading().then(() => {
          let params = {
            "online": true,
            "lastConnexionDate": new Date()
          }
          this.apiService.updateUser(user.id, params).subscribe((done) => {
            this.apiService.stopLoading()
          })
        })
     
    }
  }

  setInactive(user: User) {
    if (this.apiService.networkConnected) {
      this.apiService.showLoading().then(() => {
        let params = {
          "online": false
        }
        this.apiService.updateUser(user.id, params).subscribe((done) => {
          this.apiService.stopLoading()
        })
      })
    }
  }
}
