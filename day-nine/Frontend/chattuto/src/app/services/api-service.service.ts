import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { from, of, forkJoin } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Network } from '@capacitor/network';

export const domainConfig = {
  client: 'chattuto',
  virtual_host: 'http://127.0.0.1:8000/',
  domainApp: 'http://127.0.0.1:8000/',
  staticStorage: "static/storage/"
}

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  public status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  public tokenSet: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  public tokenSSO: String = "";
  networkConnected: boolean = true;
  virtualHostName: string = ''
  appName: string = '';
  apiPrefix = "/api"
  loader: any;
  isShowingLoader = false;
  
  // ================ AUTHENTIFICATION METHODS ====================

  getLoginUrl: string = ""

  getResetPwdUrl: string = "";
  getRefreshTokenUrl: string = ""
  getMeUrl: string = ""

  getUserUrl: string = '';
  getCreateUserUrl: string = '';
  getSearchUserUrl : string = '';
  getCreateChatUrl : string = '';
  getChatUrl : string = '' ;
  getMessageUrl : string = ''
  getUpdateMessagesStatusUrl : string=''
  getPhotoTransfertUrl : string =""

  initProvider(url, app_name, apiPrefix) {
    this.virtualHostName = url;
    this.appName = app_name;
    this.apiPrefix = apiPrefix;
    console.log("init provider appName " + this.appName);
    this.initUrls()
  }

  private initUrls() {
    // ================ AUTHENTIFICATION METHODS ====================
    this.getLoginUrl = this.virtualHostName + "auth/jwt/create/"
    this.getCreateUserUrl = this.virtualHostName + "auth/users/"
    this.getResetPwdUrl = this.virtualHostName + "auth/users/reset_password/"
    this.getRefreshTokenUrl = this.virtualHostName + "auth/jwt/refresh/"
    this.getMeUrl = this.virtualHostName + "auth/users/me/"
    // =================================================================

    this.getUserUrl = this.virtualHostName + this.apiPrefix + "/user/"
    this.getSearchUserUrl = this.virtualHostName + this.apiPrefix + "/searchUser/"
    this.getCreateChatUrl = this.virtualHostName + this.apiPrefix + "/createChat/"
    this.getChatUrl = this.virtualHostName + this.apiPrefix + "/chat/"
    this.getMessageUrl = this.virtualHostName + this.apiPrefix + "/message/"
    this.getUpdateMessagesStatusUrl = this.virtualHostName + this.apiPrefix + "/updateMessagesStatus/"
  }

  constructor(public http: HttpClient,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform) {

    this.initializeNetworkEvents();
    this.initProvider(domainConfig.virtual_host, domainConfig.client, "api")
    this.http = http
  }

  /**
   * This method will check network events and if a change occurs will store the current network status
   */
  public async initializeNetworkEvents() {
    console.log("======== Initialise Network Events ======")
    if (this.platform.is("capacitor")) {
      let status = await Network.getStatus();
      if (status["connected"] == false) {
        this.networkConnected = false
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
      else {
        this.networkConnected = true;
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
      let handler = Network.addListener('networkStatusChange', (status) => {
        console.log("Network status changed", status);
        if (status["connected"] == false) {
          this.networkConnected = false
          this.updateNetworkStatus(ConnectionStatus.Offline);
        }
        else {
          this.networkConnected = true;
          this.updateNetworkStatus(ConnectionStatus.Online);
        }
      });
    }
    else {
      if (navigator.onLine) {
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
      else {
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    }
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    this.networkConnected = status == ConnectionStatus.Offline ? false : true;
    console.log("networkConnected " + this.networkConnected)
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }


  // Store data (as json) with provided key name 
  public setLocalData(key, jsonData) {
    return new Promise(async resolve => {
      await Storage.set({ key: `${domainConfig.client}-${key}`, value: JSON.stringify(jsonData) })
      resolve(true)

    });
  }

  // Remove local data for a specific key
  public removeLocalData(key) {
    return new Promise(async resolve => {
      let ret = await Storage.remove({ key: `${domainConfig.client}-${key}` })

    });
  }
  
  // Get local data for a specific key
  public getLocalData(key) {
    return new Promise(async resolve => {
      let ret = await Storage.get({ key: `${domainConfig.client}-${key}` })

      if (ret.value) {
        resolve(JSON.parse(ret.value))
      }
      else {
        resolve(null)
      }
    });
  }

  //========= Useful methods =========
  // show a No network alert

  async showNoNetwork() {
    let alert = await this.alertCtrl.create({
      header: 'Sorry',
      message: 'No network detected, please check your connexion',
      buttons: ['OK']
    });
    return await alert.present();

  }

  // Show a loader
  async showLoading() {
    if (!this.isShowingLoader) {
      this.isShowingLoader = true
      this.loader = await this.loadingController.create({
        message: 'Merci de patienter',
        duration: 4000
      });
      return await this.loader.present();

    }

  }


  //Dismiss loader 
  async stopLoading() {
   if (this.loader) {
      this.loader.dismiss()
      this.loader = null
      this.isShowingLoader = false
    }

  }

  // Show a loader with a specific message
  public async showLoadingMessage(message) {
    this.loader = await this.loadingController.create({
      message: message,
    });
    this.loader.present();
  }


  // Show an error message
  async showError(text) {
    let alert = await this.alertCtrl.create({
      header: 'Error',
      message: text,
      buttons: ['OK']
    });
    return await alert.present();
  }

  /**
  * Show a message  
  *
  * @param title - The title of the message to show
  * @param message - The text of the message to show
  * 
  */
  async showMessage(title, message) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    return await alert.present();
  }

 


  // ================ JWT AUTHENTIFICATION METHODS ====================

  /**
   * This method is used to obtain a new access token using the refresh token value
   * @param refreshToken 
   * @returns 
   */
  refreshToken(refreshToken) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let params = {
      "refresh": refreshToken
    }
    console.log("=== ask new access token with refresh token ", params)
    return this.http.post(this.getRefreshTokenUrl, params, options).pipe(
      tap(response => {
        console.log("=== REFRESH response", response)
        this.setLocalData("access", { "access": response["access"] })
        this.setLocalData("refresh", { "refresh": response["refresh"] })

      })
    );
  }

  // Log a user with credential 
  login(params) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("URL " + this.getLoginUrl)
    console.log(params)
    return new Observable(observer => {
      this.http.post(this.getLoginUrl, params, options).subscribe(
        (val) => {
          observer.next(val)
          observer.complete()
        },
        response => {
          console.log("POST call in error", response);
          observer.next()
          observer.complete()
        },
        () => {

        });
    })

  }

  registerUser(params) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("URL " + this.getCreateUserUrl)

    return new Observable(observer => {
      this.http.post(this.getCreateUserUrl, params, options).subscribe(
        (val) => {
          observer.next({ "status": "OK", "data": val })
          observer.complete()
        },
        response => {
          console.log("POST call in error", response);
          observer.next({ "status": "KO", "error": response })
          observer.complete()
        },

        () => {

        });
    })

  }

  // Get information about connected user
  getUserMe() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("URL " + this.getMeUrl)

    return new Observable(observer => {
      this.http.get(this.getMeUrl, options).subscribe(
        (val) => {
          observer.next({ "status": "OK", "data": val })
          observer.complete()
        },
        response => {
          console.log("POST call in error", response);
          observer.next({ "status": "KO", "error": response })
          observer.complete()
        },

        () => {

        });
    })

  }

  // Create a user 
  createUser(modelToCreate) {
    // model JSON
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("URL " + this.getUserUrl)
    return this.http.post(this.getUserUrl, modelToCreate, options).pipe(retry(1))
  }

 
  searchUser(searchTerm) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return Observable.create(observer => {
      this.http.get(this.getSearchUserUrl+"?search="+searchTerm, options)
        .pipe(retry(1))
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next();
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }
  //Find user based on parameters
  findUserWithQuery(query) {
    let url = this.getUserUrl + query;
    return this.findUser(url)
  }

  private findUser(url) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return Observable.create(observer => {
      this.http.get(url, options)
        .pipe(retry(1))
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next();
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }


  getUserDetails(id) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return Observable.create(observer => {
      this.http.get(this.getUserUrl + id + "/", options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }
  
  updateUser(id, patchParams) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return Observable.create(observer => {
      this.http.patch(this.getUserUrl + id + "/", patchParams, options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(true);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }

  putUser(object) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        
      })
    };
    return Observable.create(observer => {
      this.http.put(this.getUserUrl + object.id + "/", object, options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(true);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }

  deleteUser(id) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.getUserUrl + id + "/", options).pipe(retry(1))
  }

  // Chat 
  createChat(refUser,withUser) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("URL " + this.getCreateChatUrl)

    let params = {
      "refUser":refUser,
      "chatWithUser":withUser
    }

    console.log(params)
    return Observable.create(observer => {
      this.http.post(this.getCreateChatUrl, params, options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });

  }

  getChats() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return Observable.create(observer => {
      this.http.get(this.getChatUrl, options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }

  getMessage(refChat,page) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = this.getMessageUrl+"?refChat="+refChat+"&page="+page
    return Observable.create(observer => {
      this.http.get(url, options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });
  }

  updateMessageStatus(listOfIds) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

   
    let params = {
      "messageIds":listOfIds
    }

    return Observable.create(observer => {
      this.http.post(this.getUpdateMessagesStatusUrl, params, options)
        .pipe(retry(1))
        .subscribe(res => {
          this.networkConnected = true
          observer.next(res);
          observer.complete();
        }, error => {
          observer.next(false);
          observer.complete();
          console.log(error);// Error getting the data
        });
    });

  }
  private b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  transferPhoto(base64Format,format){
    let blobData = this.b64toBlob(base64Format, `image/${format}`);
    return new Promise(resolve => {
      let name =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 10);
      const formData = new FormData();
      formData.append('file', blobData, name+`.${format}`);
      formData.append('name', name);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+ this.tokenSSO);

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formData,
      };

      fetch(this.getPhotoTransfertUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
           resolve(result)
        })
        .catch(error => {
            this.showError(error)
            resolve(null)
          });
    })
  }
 
}
