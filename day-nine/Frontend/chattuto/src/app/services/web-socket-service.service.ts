import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { ApiserviceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
 
export class WebSocketServiceService {
  RECONNECT_INTERVAL = 5000 // 5 seconds

  public messageReceived: BehaviorSubject<any> ;
  constructor(public apiService:ApiserviceService) { }

  myWebSocket: WebSocketSubject<any>;
  RETRY_SECONDS = 10; 
  isConnected = true;

  processMessage(msg){
    console.log("=== Publish message received"+JSON.stringify(msg))
    this.messageReceived.next(msg)
  }

  connect(chat) {
    return new Promise(resolve => {
      let url = "ws://127.0.0.1:8000/ws/chat/"+chat.id+"/"
      try {
        this.isConnected=true
        this.myWebSocket  = webSocket(url)
        this.messageReceived = new BehaviorSubject<any>(null);
           // Called whenever there is a message from the server    
        this.myWebSocket.subscribe(    
          msg => {
            console.log('message received: ' + JSON.stringify(msg))
            this.processMessage(msg["message"])
          }, 
          err =>{
            this.isConnected=false;
            this.apiService.showError("Unable to connect to chat")
            console.log(err)
            }, 
          // Called if WebSocket API signals some kind of error    
          () => {
            console.log('complete') 
            this.isConnected=false;
        }
     
       );
      resolve(true)

      } catch (error) {
        console.log(error)
        resolve(false)
     }
    })
  }

  sendMessage(params){
    this.myWebSocket.next(params);
  }

  close() {
    this.messageReceived.unsubscribe()
    this.myWebSocket.complete(); 
  }
 
} 