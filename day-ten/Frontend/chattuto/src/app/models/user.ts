export class User {
    fcmdevice:any;
    password:string;
    last_login:string;
    is_superuser:any;
    id:any;
    email:string;
    first_name:string;
    last_name:string;
    date_joined:Date;
    is_active:boolean;
    is_staff:boolean;
    avatar:string;
    groups:any;
    user_permissions:any;
    lastConnexionDate : Date;
    valid:boolean;
    backgroundColor : string
    online : boolean;
    classonline:string;
    constructor() {

    }


    initWithJSON(json) : User{
      for (var key in json) {
          this[key] = json[key];
      }
      return this;
    }
}