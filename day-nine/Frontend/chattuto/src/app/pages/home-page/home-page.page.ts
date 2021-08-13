import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { ApiserviceService } from 'src/app/services/api-service.service';
import { UserManagerServiceService } from 'src/app/services/user-manager-service.service';
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

  constructor(public apiService: ApiserviceService,
    public userManager: UserManagerServiceService,
    public router:Router) {
      this.loadExistingChat()
      this.taskBackground = setInterval(() => {
        this.launchBackgroundThread();
     }, 1000); //1secondes
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.taskBackground.clearInterval()
  }

  ngAfterViewInit() {
    SplashScreen.hide()
  }

  ionViewDidEnter(){
   
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
                  if (currentLastMessage.id!=lastMessageDisplayed.id){
                    //New incoming message replace in list
                    chatDisplayed.lastMessage = theChat.lastMessage
                    console.log("==Replace last message",JSON.stringify(chatDisplayed.lastMessage))
                  }
                }
              }
            }
          }
        }
      }
    })
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
    const navigationExtras: NavigationExtras = {
      state : {
        chat : chat
      }
    };
    this.router.navigate(['chat-page'], navigationExtras);
  }
}
