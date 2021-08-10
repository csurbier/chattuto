import { User } from "./user";

export class Chat {
    id:string;
    fromUser:User;
    toUser:User;
    lastMessage : any;
    createdAt : Date;
    updateAt : Date;

    constructor() {

    }

    initWithJSON(json) : Chat{
      for (var key in json) {
          if (key=="fromUser" || key=="toUser"){
            let aUser = new User().initWithJSON(json[key])
            this[key]=aUser
          }
          else {
            this[key] = json[key];
          }
      }
      return this;
    }
}