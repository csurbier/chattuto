(self.webpackChunkchattuto=self.webpackChunkchattuto||[]).push([[5371],{5371:(e,t,i)=>{"use strict";i.r(t),i.d(t,{HomePagePageModule:()=>T});var s=i(1116),n=i(1462),o=i(6611),a=i(4905),r=i(2755),c=i(3361);class l{constructor(){}initWithJSON(e){for(var t in e)if("fromUser"==t||"toUser"==t){let i=(new c.n).initWithJSON(e[t]);this[t]=i}else this[t]=e[t];return this}}var g=i(8619),h=i(9002),u=i(2767);const p=["searchbar"],f=function(e){return{background:e}};function d(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"ion-item"),g._UZ(1,"div",5),g.TgZ(2,"ion-label",6),g._uU(3),g.qZA(),g.TgZ(4,"ion-button",7),g.NdJ("click",function(){const t=g.CHM(e).$implicit;return g.oxw().createChat(t)}),g._UZ(5,"ion-icon",8),g.qZA(),g.qZA()}if(2&e){const e=t.$implicit;g.xp6(1),g.Q6J("ngStyle",g.VKq(3,f,e.backgroundColor)),g.xp6(2),g.AsE("",e.first_name," ",e.last_name,"")}}function m(e,t){if(1&e&&(g.TgZ(0,"p"),g._uU(1),g.qZA()),2&e){const e=g.oxw(2).$implicit;g.xp6(1),g.hij(" ",e.lastMessage[0].message," ")}}function Z(e,t){if(1&e&&(g.TgZ(0,"ion-badge",18),g._uU(1),g.qZA()),2&e){const e=g.oxw(3).$implicit;g.xp6(1),g.Oqu(e.lastMessage[0].isRead)}}function C(e,t){if(1&e&&(g.TgZ(0,"ion-col",15),g.TgZ(1,"span",16),g._uU(2),g.ALo(3,"date"),g.qZA(),g.YNc(4,Z,2,1,"ion-badge",17),g.qZA()),2&e){const e=g.oxw(2).$implicit;g.xp6(2),g.Oqu(g.xi3(3,2,e.lastMessage[0].updatedAt,"HH:mm")),g.xp6(2),g.Q6J("ngIf",e.lastMessage[0].isRead)}}function x(e,t){if(1&e&&(g.TgZ(0,"ion-label",6),g.TgZ(1,"ion-row",11),g.TgZ(2,"ion-col",12),g.TgZ(3,"h2"),g._uU(4),g.qZA(),g.YNc(5,m,2,1,"p",13),g.qZA(),g.YNc(6,C,5,5,"ion-col",14),g.qZA(),g.qZA()),2&e){const e=g.oxw().$implicit;g.xp6(1),g.Q6J("ngClass",e.classMessage),g.xp6(3),g.AsE("",e.fromUser.first_name," ",e.fromUser.last_name,""),g.xp6(1),g.Q6J("ngIf",e.lastMessage.length>0),g.xp6(1),g.Q6J("ngIf",e.lastMessage.length>0)}}function b(e,t){if(1&e&&(g.TgZ(0,"p"),g._uU(1),g.qZA()),2&e){const e=g.oxw(2).$implicit;g.xp6(1),g.hij(" ",e.lastMessage[0].message," ")}}function w(e,t){if(1&e&&(g.TgZ(0,"ion-col",15),g.TgZ(1,"p"),g._uU(2),g.ALo(3,"date"),g.qZA(),g.qZA()),2&e){const e=g.oxw(2).$implicit;g.xp6(2),g.Oqu(g.xi3(3,1,e.lastMessage[0].updatedAt,"HH:mm"))}}function A(e,t){if(1&e&&(g.TgZ(0,"ion-label",6),g.TgZ(1,"ion-row",11),g.TgZ(2,"ion-col",12),g.TgZ(3,"h2"),g._uU(4),g.qZA(),g.YNc(5,b,2,1,"p",13),g.qZA(),g.YNc(6,w,4,4,"ion-col",14),g.qZA(),g.qZA()),2&e){const e=g.oxw().$implicit;g.xp6(1),g.Q6J("ngClass",e.classMessage),g.xp6(3),g.AsE("",e.toUser.first_name," ",e.toUser.last_name,""),g.xp6(1),g.Q6J("ngIf",e.lastMessage.length>0),g.xp6(1),g.Q6J("ngIf",e.lastMessage.length>0)}}function q(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"ion-item",9),g.NdJ("click",function(){const t=g.CHM(e).$implicit;return g.oxw().goToChat(t)}),g._UZ(1,"div",5),g.YNc(2,x,7,5,"ion-label",10),g.YNc(3,A,7,5,"ion-label",10),g.qZA()}if(2&e){const e=t.$implicit,i=g.oxw();g.xp6(1),g.Q6J("ngStyle",g.VKq(3,f,e.backgroundColor)),g.xp6(1),g.Q6J("ngIf",e.fromUser.id!=i.userManager.currentUser.id),g.xp6(1),g.Q6J("ngIf",e.toUser.id!=i.userManager.currentUser.id)}}const U=[{path:"",component:(()=>{class e{constructor(e,t,i){this.apiService=e,this.userManager=t,this.router=i,this.listOfUser=[],this.isSearching=!1,this.loadExistingChat()}ngOnInit(){}ngAfterViewInit(){r.c.hide()}getRandomColor(){return"#"+("000000"+Math.floor(16777216*Math.random()).toString(16)).slice(-6)}loadExistingChat(){this.apiService.networkConnected&&(this.isSearching=!0,this.chatList=[],this.apiService.getChats().subscribe(e=>{if(e&&e.count>0)for(let t of e.results){let e=(new l).initWithJSON(t);if(console.log(e),e.backgroundColor=this.getRandomColor(),e.lastMessage.length>0){let t="messageUnread";e.lastMessage[0].isRead&&(t="messageread"),e.classMessage=t}this.chatList.push(e)}}))}onSearchChange(e){0==this.isSearching&&e.detail.value.length>0?this.apiService.networkConnected?(this.isSearching=!0,this.apiService.showLoading().then(()=>{console.log("===Call api with ",e.detail.value),this.apiService.searchUser(e.detail.value).subscribe(e=>{if(this.apiService.stopLoading(),this.isSearching=!1,console.log(e),e.count>0){let t=e.results;this.listOfUser=[];for(let e of t)e.backgroundColor=this.getRandomColor(),this.listOfUser.push(e);this.searchbarElement.setFocus()}})})):this.apiService.showNoNetwork():(this.listOfUser=[],this.isSearching=!1)}createChat(e){this.apiService.networkConnected?this.apiService.showLoading().then(()=>{this.apiService.createChat(this.userManager.currentUser.id,e.id).subscribe(e=>{if(this.apiService.stopLoading(),this.isSearching=!1,this.searchbarElement.value="",this.listOfUser=[],this.loadExistingChat(),e){let t=(new l).initWithJSON(e);this.goToChat(t)}})}):this.apiService.showNoNetwork()}goToChat(e){this.router.navigate(["chat-page"],{state:{chat:e}})}}return e.\u0275fac=function(t){return new(t||e)(g.Y36(h.OX),g.Y36(u.C),g.Y36(a.F0))},e.\u0275cmp=g.Xpm({type:e,selectors:[["app-home-page"]],viewQuery:function(e,t){if(1&e&&g.Gf(p,7),2&e){let e;g.iGM(e=g.CRH())&&(t.searchbarElement=e.first)}},decls:14,vars:3,consts:[["placeholder","Search users","inputmode","text","type","text",3,"debounce","ionChange"],["searchbar",""],["mode","ios","no-lines","","message-list",""],[4,"ngFor","ngForOf"],[3,"click",4,"ngFor","ngForOf"],[1,"image-profile",3,"ngStyle"],[1,"username"],["slot","end","expand","block","fill","clear","shape","round",3,"click"],["name","chatbubbles-outline"],[3,"click"],["class","username",4,"ngIf"],[3,"ngClass"],["size","10"],[4,"ngIf"],["size","2",4,"ngIf"],["size","2"],[1,"timestamp"],["color","primary",4,"ngIf"],["color","primary"]],template:function(e,t){1&e&&(g.TgZ(0,"ion-header"),g.TgZ(1,"ion-toolbar"),g.TgZ(2,"ion-title"),g._uU(3,"ChatTuto"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(4,"ion-content"),g.TgZ(5,"ion-searchbar",0,1),g.NdJ("ionChange",function(e){return t.onSearchChange(e)}),g.qZA(),g.TgZ(7,"ion-list",2),g.YNc(8,d,6,5,"ion-item",3),g.qZA(),g.TgZ(9,"ion-list-header"),g.TgZ(10,"ion-label"),g._uU(11,"Chats"),g.qZA(),g.qZA(),g.TgZ(12,"ion-list",2),g.YNc(13,q,4,5,"ion-item",4),g.qZA(),g.qZA()),2&e&&(g.xp6(5),g.Q6J("debounce",250),g.xp6(3),g.Q6J("ngForOf",t.listOfUser),g.xp6(5),g.Q6J("ngForOf",t.chatList))},directives:[o.Gu,o.sr,o.wd,o.W2,o.VI,o.j9,o.q_,s.sg,o.yh,o.Q$,o.Ie,s.PC,o.YG,o.gu,s.O5,o.Nd,s.mk,o.wI,o.yp],pipes:[s.uU],styles:[".image-profile[_ngcontent-%COMP%]{width:2rem;height:2rem;display:block;border-radius:50%;border:3px solid green;margin-right:10px}.username[_ngcontent-%COMP%]{font-weight:700}.messageUnread[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700;color:red}.messageread[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:400;color:#000}"]}),e})()}];let S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[a.Bz.forChild(U)],a.Bz]}),e})(),T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[s.ez,n.u5,o.Pc,S]]}),e})()}}]);