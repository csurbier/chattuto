import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { ApiserviceService } from 'src/app/services/api-service.service';
import { UserManagerServiceService } from 'src/app/services/user-manager-service.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit,OnDestroy {
  @ViewChild('searchbar', { static: true }) searchbarElement;

  listOfUser: User[] = []
  isSearching = false
  chatList: any;
  taskBackground : any
  sendPushTokenInProgress = false

  constructor(public apiService: ApiserviceService,
    public userManager: UserManagerServiceService,
    public platform:Platform,
    public router:Router) {
      this.loadExistingChat()
    
  }

  ngOnInit() {

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        if (this.sendPushTokenInProgress == false) {
          this.sendPushTokenInProgress = true
          let deviceName = "";
          let typeDevice = "";
          if (this.platform.is('android')) {
            deviceName = "android";
            typeDevice = "android";
          }
          else if (this.platform.is('ios')) {
            deviceName = "ios";
            typeDevice = "ios";
          }
          else {
            deviceName = "web";
            typeDevice = "web";
          }
          console.log("===Envoi token ",token.value)
          console.log("User ",this.userManager.currentUser.id,this.userManager.currentUser.first_name,this.userManager.currentUser.last_name)
          this.apiService.sendFcmToken(this.userManager.currentUser.id,token.value, deviceName, typeDevice).subscribe((success) => {
            this.sendPushTokenInProgress = false
            console.log(token.value)
          })
        }
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
       // notifiy the error to the user
       this.apiService.showError(error)
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log(notification);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log(notification);
      }
    );
  }

  ngOnDestroy(){
    if (this.taskBackground){
      clearInterval(this.taskBackground)
     }
  }

  ngAfterViewInit() {
    SplashScreen.hide()
  }

  ionViewDidEnter(){
    this.taskBackground = setInterval(() => {
      this.launchBackgroundThread();
   }, 1000); //1secondes
  }

  launchBackgroundThread(){
    this.apiService.getChats().subscribe((list) => {
      console.log(list)
      if (list){
        let count = list["count"]
        if (count>this.chatList.length){
          //New chat refresh the list
          console.log("===nouveau chat")
          this.chatList = []
          this.parseChatList(list)
        }
        else{
          //check message
          for (let aChat of list["results"]) {
            let theChat = new Chat().initWithJSON(aChat)
            for (let chatDisplayed of this.chatList){
              if (chatDisplayed.id==theChat.id){
                let lastMessageDisplayed = chatDisplayed.lastMessage[0]
                let currentLastMessage = theChat.lastMessage[0]
                if (currentLastMessage && !lastMessageDisplayed){
                  chatDisplayed.lastMessage = theChat.lastMessage
                  console.log("==Replace last message",JSON.stringify(chatDisplayed.lastMessage))
                }
                else{
                  if (lastMessageDisplayed && currentLastMessage){
                    if (currentLastMessage.id!=lastMessageDisplayed.id){
                      //New incoming message replace in list
                      chatDisplayed.lastMessage = theChat.lastMessage
                      console.log("==Replace last message",JSON.stringify(chatDisplayed.lastMessage))
                    }
                  }
                }
                if (theChat.fromUser.id==chatDisplayed.fromUser.id){
                  chatDisplayed.fromUser.online = theChat.fromUser.online
                  chatDisplayed.toUser.online = theChat.toUser.online
                }
                else {
                  chatDisplayed.fromUser.online = theChat.toUser.online
                  chatDisplayed.toUser.online = theChat.fromUser.online
                }
                // check online offlie
                this.checkOnlineOffline(chatDisplayed)
              }
            }
          }
        }
      }
    })
  }
  
  checkOnlineOffline(theChat){
    
    if (theChat.fromUser.id!=this.userManager.currentUser.id){
      if (theChat.fromUser.online){
        theChat["classonline"]="image-profile-online"
      }
      else {
        theChat["classonline"]="image-profile-offline"
      }
    }
    else{
      //Other 
      if (theChat.toUser.online){
        theChat["classonline"]="image-profile-online"
      }
      else {
        theChat["classonline"]="image-profile-offline"
      }
    }
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }


  parseChatList(list){
    let count = list["count"]
    if (count > 0) {
      //Iterate existing chat
      for (let aChat of list["results"]) {
        let theChat = new Chat().initWithJSON(aChat)
        console.log(theChat)
        theChat["backgroundColor"] = this.getRandomColor()
        if (theChat.lastMessage.length > 0) {
          let lastmessage = theChat.lastMessage[0]
          let classMessage = 'messageUnread'
          if (lastmessage.isRead) {
            classMessage = "messageread"
          }
          theChat["classMessage"] = classMessage
        }
        this.checkOnlineOffline(theChat)
        this.chatList.push(theChat)
      }
    }
  }
  loadExistingChat() {
    if (this.apiService.networkConnected) {
      this.isSearching = true

      this.chatList = []
      this.apiService.getChats().subscribe((list) => {
        if (list) {
          this.parseChatList(list)
        }
      })
    }
  }

  onSearchChange(event) {
    if (this.isSearching == false && event.detail.value.length > 0) {
      if (this.apiService.networkConnected) {
        this.isSearching = true
        this.apiService.showLoading().then(() => {
          console.log("===Call api with ", event.detail.value)
          this.apiService.searchUser(event.detail.value).subscribe((results) => {
            this.apiService.stopLoading()
            this.isSearching = false
            console.log(results)
            let count = results["count"]
            if (count > 0) {
              let data = results["results"]
              this.listOfUser = []
              for (let item of data) {
                item["backgroundColor"] = this.getRandomColor()
                if (item.online){
                    item["classonline"]="image-profile-online"
                }
                else {
                    item["classonline"]="image-profile-offline"
                }
               
                this.listOfUser.push(item)
              }
              //Focus on searchbar again
              this.searchbarElement.setFocus();;
            }
          })
        })
      }
      else {
        this.apiService.showNoNetwork()
      }
    }
    else {
      this.listOfUser = []
      this.isSearching = false
    }
  }


  createChat(userToChat) {
    if (this.apiService.networkConnected) {
      this.apiService.showLoading().then(() => {
        this.apiService.createChat(this.userManager.currentUser.id, userToChat.id).subscribe((response) => {
          this.apiService.stopLoading()
         
          this.isSearching = false
          this.searchbarElement.value=""
          this.listOfUser = []
          this.loadExistingChat()
          
          if (response){
            let chat = new Chat().initWithJSON(response)
            this.goToChat(chat)
          }
          
          
        })
      })
    }
    else {
      this.apiService.showNoNetwork()
    }
  }

  goToChat(chat){
    if (this.taskBackground){
     clearInterval(this.taskBackground)
    }
  
    const navigationExtras: NavigationExtras = {
      state : {
        chat : chat
      }
    };
    this.router.navigate(['chat-page'], navigationExtras);
  }
}
