import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonList, Platform } from '@ionic/angular';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ApiserviceService } from 'src/app/services/api-service.service';
import { UserManagerServiceService } from 'src/app/services/user-manager-service.service';
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit,OnDestroy {
  @ViewChild('content', { static: true }) content;
  @ViewChild(IonList, { read:ElementRef }) list:ElementRef;

  chat : Chat;
  username : string =''
  myUser : User
  otherUser : User
  messages = [
    
  ]
  messageToSend = ""
  currentPage=1 
  hasPrevious = false
  loadingPrevious = false
  dateMessage : string ; 
   
  constructor(public apiService:ApiserviceService,
    public userManager:UserManagerServiceService,
    public router: Router,
    public route:ActivatedRoute,
    private webSocketService:WebSocketServiceService,
    public platform:Platform) { 

    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.chat = this.router.getCurrentNavigation().extras.state.chat;
        // can connect to the chat websocket 
        this.webSocketService.connect(this.chat)
        if (this.webSocketService.isConnected){
          this.webSocketService.messageReceived.subscribe((message)=>{
            if (message){
               console.log(message)
              let theMessage = new Message().initWithJSON(message)
              console.log("WS Received message read ?",theMessage.isRead)
           
              theMessage.createdAt = new Date()
              this.messages.push(theMessage)
              // scroll to bottom to see the message
              this.content.scrollToBottom(1000);
             
              let messagesIdToUpdate = []
              if (theMessage.author!=this.myUser.id && theMessage.isRead==false){
                  // I just read the message need to change the isRead to true
                  messagesIdToUpdate.push(theMessage.id)
                  this.updateReadStatusForMessages(messagesIdToUpdate)
              }
            }
          })
        }
        if (this.chat.fromUser.id==this.userManager.currentUser.id){
          this.myUser = this.chat.fromUser
          this.otherUser = this.chat.toUser
        }
        else{
          this.myUser = this.chat.toUser
          this.otherUser = this.chat.fromUser
        }
        this.username = this.otherUser.first_name+" "+this.otherUser.last_name
        this.messages = []
        this.loadChat(this.currentPage,false)
      }
      else{
        //Return home
        this.router.navigateByUrl("/home")
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log("=== Disconnecting websocket ====")
    this.webSocketService.close()
  }

  sendMessage(){
    this.sendMessageWithArg(0,"")
  }

  sendMessageWithArg(type,extraData){
    if (this.webSocketService.isConnected){
      //create the expected json message
      let newMessage = {
        "author" : this.myUser.id,
        "refChat" : this.chat.id,
        "message" : this.messageToSend,
        "type" : type,
        "extraData": extraData
      }
      this.webSocketService.sendMessage(newMessage)
      this.messageToSend=""
    }
  }

  async showLocation(message){
    let extraData = message.extraData
    if (extraData){
      let tokens = extraData.split(",")
      console.log(extraData)
      let lat = tokens[0]
      let lon = tokens[1]
      let urlGoogleMap = "https://maps.google.com/?q=" + lat + "," + lon
      await Browser.open({ url: urlGoogleMap });
    }
   
  }

  loadChat(page,fromScrolling){
    if (this.apiService.networkConnected){
      
        this.loadingPrevious = true
        this.apiService.getMessage(this.chat.id,page).subscribe((list)=>{
          this.loadingPrevious = false
          this.apiService.stopLoading()
          if (list) {
            console.log(list)
            let count = list["count"]
            let next = list["next"]
            if (next){
              this.hasPrevious=true
            }
            else{
              this.hasPrevious=false
            }
            if (count > 0) {
              //Iterate existing message
              let arrayToReverse = list["results"]
              let finalListe =arrayToReverse.reverse()
              let newList = []
              let messagesIdToUpdate = []
              for (let aMessage of finalListe) {
                let theMessage = new Message().initWithJSON(aMessage)
                if (theMessage.author!=this.myUser.id && theMessage.isRead==false){
                  // I just read the message need to change the isRead to true
                  messagesIdToUpdate.push(theMessage.id)
                }
                newList.push(theMessage)
              }
              if (messagesIdToUpdate.length>0){
                this.updateReadStatusForMessages(messagesIdToUpdate)
              }
              //concat newList and existings messages 
              let prov = newList.concat(this.messages)
              this.messages = prov
              if (!fromScrolling){
                  //Move to bottom
                  setTimeout(()=>{
                    this.content.scrollToBottom(1000);
                  },200)
              }
              else{
                //Need to scroll to last viewed message, wait for list refresh 100ms
                setTimeout(()=>{
                  let listArray = this.list.nativeElement.children
                  let itemToScroll = listArray[20]
                  itemToScroll.scrollIntoView({behavior:'instant',block:'end'})
                },100)
              }
            }
          }
      
      })
    }
    else{
      this.apiService.showNoNetwork()
    }
  }

  
  checkScrolling($event){
    if ($event.detail.scrollTop === 0) {
      //should load previous
      if (this.hasPrevious && !this.loadingPrevious){
        this.currentPage+=1
         this.loadChat(this.currentPage,true)
      }
      else{
        //No more previous
      }
    }
   
  }

  updateReadStatusForMessages(listOfIds){
    if (this.apiService.networkConnected){
      this.apiService.updateMessageStatus(listOfIds).subscribe((done)=>{
        console.log(done)
      })
    }
  }
 
  sendLocationMessage(latitude,longitude){
    let extraData = Number(latitude).toString()+","+Number(longitude).toString()
    this.sendMessageWithArg(1,extraData)
  }

  async getCurrentLocation(){
    const position = await Geolocation.getCurrentPosition();
    if (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.sendLocationMessage(latitude,longitude)
    }
    else{
      this.apiService.showError("Geolocation unavailable !")
    }
  }

  async clicGeoloc(){
    if (this.platform.is("capacitor")){
      await Geolocation.checkPermissions().then((status)=>{
        if (status.location=="granted"){
          this.getCurrentLocation()
        }
        else{
          Geolocation.requestPermissions().then((status)=>{
            if (status.location=="granted"){
              this.getCurrentLocation()
            }
          })
        }
      })
    }
    else{
      // Get location from browser 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log("============= POSITION  ================");
            console.log(position)
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            this.sendLocationMessage(latitude,longitude)
          },
          error => {
            this.apiService.showError("Geolocation unavailable !")
          }
        );
      }
    }
   
  }

  async clicCamera(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    if (image){
      //Send image to server
      let extraData =`data:image/${image.format}`+";base64,"+image.base64String
       this.sendMessageWithArg(2,extraData)
    }
  }

   
  
  isDifferentDay(messageIndex: number): boolean {

    if (messageIndex === 0) return true;
  
    const d1 = new Date(this.messages[messageIndex - 1].createdAt);
    const d2 = new Date(this.messages[messageIndex].createdAt);

    return d1.getFullYear() !== d2.getFullYear()
      || d1.getMonth() !== d2.getMonth()
      || d1.getDate() !== d2.getDate();
}

 getMessageDate(messageIndex: number): string {

   const wholeDate = new Date(this.messages[messageIndex].createdAt).toDateString();

   this.dateMessage = wholeDate.slice(0, wholeDate.length - 5);
  
   return this.dateMessage;

 }

}
