import { Component, OnInit, ViewChild } from '@angular/core';
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
export class HomePagePage implements OnInit {
  @ViewChild('searchbar', { static: true }) searchbarElement;

  listOfUser: User[] = []
  isSearching = false
  chatList: any;

  constructor(public apiService: ApiserviceService,
    public userManager: UserManagerServiceService) {
    this.loadExistingChat()
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    SplashScreen.hide()
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }


  loadExistingChat() {
    if (this.apiService.networkConnected) {
      this.isSearching = true

      this.chatList = []
      this.apiService.getChats().subscribe((list) => {

        if (list) {
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
              this.chatList.push(theChat)
            }
           
          }
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
          console.log(response)
        })
      })
    }
    else {
      this.apiService.showNoNetwork()
    }
  }
}
