
export class Message {
    id:string;
    message:string;
    type:number;
    extraData:any;
    isRead:boolean;
    refChat:string;
    author:string;
    createdAt : Date;
    updateAt : Date;

    constructor() {

    }

    initWithJSON(json) : Message{
      for (var key in json) {
          
            this[key] = json[key];
          
      }
      return this;
    }
}