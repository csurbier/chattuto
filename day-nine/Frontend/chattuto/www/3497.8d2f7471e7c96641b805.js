(self.webpackChunkchattuto=self.webpackChunkchattuto||[]).push([[3497],{3497:(e,t,s)=>{"use strict";s.r(t),s.d(t,{ChatPagePageModule:()=>L});var i=s(1116),n=s(1462),o=s(6611),r=s(4905),c=s(4762),a=s(8619);class h{constructor(){}initWithJSON(e){for(var t in e)this[t]=e[t];return this}}const l=(0,s(5310).fo)("Geolocation",{web:()=>s.e(7762).then(s.bind(s,7762)).then(e=>new e.GeolocationWeb)});var u=s(9002),d=s(2767),g=s(5959),p=s(6673),f=s(8318),m=s(7570);class b extends m.w{constructor(e,t){super()}schedule(e,t=0){return this}}class w extends b{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){if(this.closed)return this;this.state=e;const s=this.id,i=this.scheduler;return null!=s&&(this.id=this.recycleAsyncId(i,s,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(i,this.id,t),this}requestAsyncId(e,t,s=0){return setInterval(e.flush.bind(e,this),s)}recycleAsyncId(e,t,s=0){if(null!==s&&this.delay===s&&!1===this.pending)return t;clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const s=this._execute(e,t);if(s)return s;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let s,i=!1;try{this.work(e)}catch(n){i=!0,s=!!n&&n||new Error(n)}if(i)return this.unsubscribe(),s}_unsubscribe(){const e=this.id,t=this.scheduler,s=t.actions,i=s.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==i&&s.splice(i,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}}class v extends w{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}schedule(e,t=0){return t>0?super.schedule(e,t):(this.delay=t,this.state=e,this.scheduler.flush(this),this)}execute(e,t){return t>0||this.closed?super.execute(e,t):this._execute(e,t)}requestAsyncId(e,t,s=0){return null!==s&&s>0||null===s&&this.delay>0?super.requestAsyncId(e,t,s):e.flush(this)}}let x=(()=>{class e{constructor(t,s=e.now){this.SchedulerAction=t,this.now=s}schedule(e,t=0,s){return new this.SchedulerAction(this,e).schedule(s,t)}}return e.now=()=>Date.now(),e})();class _ extends x{constructor(e,t=x.now){super(e,()=>_.delegate&&_.delegate!==this?_.delegate.now():t()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(e,t=0,s){return _.delegate&&_.delegate!==this?_.delegate.schedule(e,t,s):super.schedule(e,t,s)}flush(e){const{actions:t}=this;if(this.active)return void t.push(e);let s;this.active=!0;do{if(s=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,s){for(;e=t.shift();)e.unsubscribe();throw s}}}class S extends _{}const y=new S(v);var k=s(653),T=s(878),C=s(1225);let M=(()=>{class e{constructor(e,t,s){this.kind=e,this.value=t,this.error=s,this.hasValue="N"===e}observe(e){switch(this.kind){case"N":return e.next&&e.next(this.value);case"E":return e.error&&e.error(this.error);case"C":return e.complete&&e.complete()}}do(e,t,s){switch(this.kind){case"N":return e&&e(this.value);case"E":return t&&t(this.error);case"C":return s&&s()}}accept(e,t,s){return e&&"function"==typeof e.next?this.observe(e):this.do(e,t,s)}toObservable(){switch(this.kind){case"N":return(0,T.of)(this.value);case"E":return(0,C._)(this.error);case"C":return(0,k.c)()}throw new Error("unexpected notification kind value")}static createNext(t){return void 0!==t?new e("N",t):e.undefinedValueNotification}static createError(t){return new e("E",void 0,t)}static createComplete(){return e.completeNotification}}return e.completeNotification=new e("C"),e.undefinedValueNotification=new e("N",void 0),e})();class Z extends p.L{constructor(e,t,s=0){super(e),this.scheduler=t,this.delay=s}static dispatch(e){const{notification:t,destination:s}=e;t.observe(s),this.unsubscribe()}scheduleMessage(e){this.destination.add(this.scheduler.schedule(Z.dispatch,this.delay,new N(e,this.destination)))}_next(e){this.scheduleMessage(M.createNext(e))}_error(e){this.scheduleMessage(M.createError(e)),this.unsubscribe()}_complete(){this.scheduleMessage(M.createComplete()),this.unsubscribe()}}class N{constructor(e,t){this.notification=e,this.destination=t}}var O=s(3895),A=s(9291);class I extends g.xQ{constructor(e=Number.POSITIVE_INFINITY,t=Number.POSITIVE_INFINITY,s){super(),this.scheduler=s,this._events=[],this._infiniteTimeWindow=!1,this._bufferSize=e<1?1:e,this._windowTime=t<1?1:t,t===Number.POSITIVE_INFINITY?(this._infiniteTimeWindow=!0,this.next=this.nextInfiniteTimeWindow):this.next=this.nextTimeWindow}nextInfiniteTimeWindow(e){if(!this.isStopped){const t=this._events;t.push(e),t.length>this._bufferSize&&t.shift()}super.next(e)}nextTimeWindow(e){this.isStopped||(this._events.push(new P(this._getNow(),e)),this._trimBufferThenGetEvents()),super.next(e)}_subscribe(e){const t=this._infiniteTimeWindow,s=t?this._events:this._trimBufferThenGetEvents(),i=this.scheduler,n=s.length;let o;if(this.closed)throw new O.N;if(this.isStopped||this.hasError?o=m.w.EMPTY:(this.observers.push(e),o=new A.W(this,e)),i&&e.add(e=new Z(e,i)),t)for(let r=0;r<n&&!e.closed;r++)e.next(s[r]);else for(let r=0;r<n&&!e.closed;r++)e.next(s[r].value);return this.hasError?e.error(this.thrownError):this.isStopped&&e.complete(),o}_getNow(){return(this.scheduler||y).now()}_trimBufferThenGetEvents(){const e=this._getNow(),t=this._bufferSize,s=this._windowTime,i=this._events,n=i.length;let o=0;for(;o<n&&!(e-i[o].time<s);)o++;return n>t&&(o=Math.max(o,n-t)),o>0&&i.splice(0,o),i}}class P{constructor(e,t){this.time=e,this.value=t}}const q={url:"",deserializer:e=>JSON.parse(e.data),serializer:e=>JSON.stringify(e)};class E extends g.ug{constructor(e,t){if(super(),e instanceof f.y)this.destination=t,this.source=e;else{const t=this._config=Object.assign({},q);if(this._output=new g.xQ,"string"==typeof e)t.url=e;else for(let s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);if(!t.WebSocketCtor&&WebSocket)t.WebSocketCtor=WebSocket;else if(!t.WebSocketCtor)throw new Error("no WebSocket constructor can be found");this.destination=new I}}lift(e){const t=new E(this._config,this.destination);return t.operator=e,t.source=this,t}_resetState(){this._socket=null,this.source||(this.destination=new I),this._output=new g.xQ}multiplex(e,t,s){const i=this;return new f.y(n=>{try{i.next(e())}catch(r){n.error(r)}const o=i.subscribe(e=>{try{s(e)&&n.next(e)}catch(r){n.error(r)}},e=>n.error(e),()=>n.complete());return()=>{try{i.next(t())}catch(r){n.error(r)}o.unsubscribe()}})}_connectSocket(){const{WebSocketCtor:e,protocol:t,url:s,binaryType:i}=this._config,n=this._output;let o=null;try{o=t?new e(s,t):new e(s),this._socket=o,i&&(this._socket.binaryType=i)}catch(c){return void n.error(c)}const r=new m.w(()=>{this._socket=null,o&&1===o.readyState&&o.close()});o.onopen=e=>{const{_socket:t}=this;if(!t)return o.close(),void this._resetState();const{openObserver:s}=this._config;s&&s.next(e);const i=this.destination;this.destination=p.L.create(t=>{if(1===o.readyState)try{const{serializer:e}=this._config;o.send(e(t))}catch(e){this.destination.error(e)}},e=>{const{closingObserver:t}=this._config;t&&t.next(void 0),e&&e.code?o.close(e.code,e.reason):n.error(new TypeError("WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }")),this._resetState()},()=>{const{closingObserver:e}=this._config;e&&e.next(void 0),o.close(),this._resetState()}),i&&i instanceof I&&r.add(i.subscribe(this.destination))},o.onerror=e=>{this._resetState(),n.error(e)},o.onclose=e=>{this._resetState();const{closeObserver:t}=this._config;t&&t.next(e),e.wasClean?n.complete():n.error(e)},o.onmessage=e=>{try{const{deserializer:t}=this._config;n.next(t(e))}catch(t){n.error(t)}}}_subscribe(e){const{source:t}=this;return t?t.subscribe(e):(this._socket||this._connectSocket(),this._output.subscribe(e),e.add(()=>{const{_socket:e}=this;0===this._output.observers.length&&(e&&1===e.readyState&&e.close(),this._resetState())}),e)}unsubscribe(){const{_socket:e}=this;e&&1===e.readyState&&e.close(),this._resetState(),super.unsubscribe()}}var U=s(8512);let W=(()=>{class e{constructor(e){this.apiService=e,this.RECONNECT_INTERVAL=5e3,this.RETRY_SECONDS=10,this.isConnected=!0}processMessage(e){console.log("=== Publish message received"+JSON.stringify(e)),this.messageReceived.next(e)}connect(e){return new Promise(t=>{let s="ws://127.0.0.1:8000/ws/chat/"+e.id+"/";try{this.isConnected=!0,this.myWebSocket=new E(s),this.messageReceived=new U.X(null),this.myWebSocket.subscribe(e=>{console.log("message received: "+JSON.stringify(e)),this.processMessage(e.message)},e=>{this.isConnected=!1,this.apiService.showError("Unable to connect to chat"),console.log(e)},()=>{console.log("complete"),this.isConnected=!1}),t(!0)}catch(i){console.log(i),t(!1)}})}sendMessage(e){this.myWebSocket.next(e)}close(){this.messageReceived.unsubscribe(),this.myWebSocket.complete()}}return e.\u0275fac=function(t){return new(t||e)(a.LFG(u.OX))},e.\u0275prov=a.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();const J=["content"];function z(e,t){if(1&e&&(a.TgZ(0,"ion-row",24),a.TgZ(1,"ion-badge"),a._uU(2),a.qZA(),a.qZA()),2&e){const e=a.oxw().index,t=a.oxw();a.xp6(2),a.Oqu(t.getMessageDate(e))}}function F(e,t){1&e&&a._UZ(0,"ion-icon",25)}function G(e,t){1&e&&a._UZ(0,"ion-icon",26)}function Y(e,t){if(1&e&&(a.TgZ(0,"div"),a.TgZ(1,"div",19),a.YNc(2,z,3,1,"ion-row",20),a.TgZ(3,"div"),a.TgZ(4,"span"),a._uU(5),a.qZA(),a.TgZ(6,"span",21),a._uU(7),a.ALo(8,"date"),a.YNc(9,F,1,0,"ion-icon",22),a.YNc(10,G,1,0,"ion-icon",23),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e){const e=t.$implicit,s=t.index,i=a.oxw();a.xp6(2),a.Q6J("ngIf",i.isDifferentDay(s)),a.xp6(1),a.Tol(e.author===i.myUser.id?"messageFromMe":"messageFromOther"),a.xp6(2),a.hij(" ",e.message," "),a.xp6(2),a.hij(" ",a.xi3(8,7,e.createdAt,"HH:mm")," "),a.xp6(2),a.Q6J("ngIf",e.author===i.myUser.id&&e.isRead),a.xp6(1),a.Q6J("ngIf",e.author===i.myUser.id&&!e.isRead)}}const D=[{path:"",component:(()=>{class e{constructor(e,t,s,i,n,o){this.apiService=e,this.userManager=t,this.router=s,this.route=i,this.webSocketService=n,this.platform=o,this.username="",this.messages=[],this.messageToSend="",this.currentPage=1,this.hasPrevious=!1,this.loadingPrevious=!1,this.route.queryParams.subscribe(e=>{this.router.getCurrentNavigation().extras.state?(this.chat=this.router.getCurrentNavigation().extras.state.chat,this.webSocketService.connect(this.chat),this.webSocketService.isConnected&&this.webSocketService.messageReceived.subscribe(e=>{if(e){console.log("WS Received message "),console.log(e);let t=(new h).initWithJSON(e);t.createdAt=new Date,this.messages.push(t);let s=[];t.author!=this.myUser.id&&0==t.isRead&&(s.push(t.id),this.updateReadStatusForMessages(s))}}),this.chat.fromUser.id==this.userManager.currentUser.id?(this.myUser=this.chat.fromUser,this.otherUser=this.chat.toUser):(this.myUser=this.chat.toUser,this.otherUser=this.chat.fromUser),this.username=this.otherUser.first_name+" "+this.otherUser.last_name,this.messages=[],this.loadChat(this.currentPage,!1)):this.router.navigateByUrl("/home")})}ngOnInit(){}ngOnDestroy(){console.log("=== Disconnecting websocket ===="),this.webSocketService.close()}sendMessage(){this.webSocketService.isConnected&&(this.webSocketService.sendMessage({author:this.myUser.id,refChat:this.chat.id,message:this.messageToSend,type:0,extraData:""}),this.messageToSend="")}loadChat(e,t){this.apiService.networkConnected?(this.loadingPrevious=!0,this.apiService.getMessage(this.chat.id,e).subscribe(e=>{if(this.loadingPrevious=!1,this.apiService.stopLoading(),e){console.log(e);let s=e.count;if(this.hasPrevious=!!e.next,s>0){let s=e.results.reverse(),i=[],n=[];for(let e of s){let t=(new h).initWithJSON(e);t.author!=this.myUser.id&&0==t.isRead&&n.push(t.id),i.push(t)}n.length>0&&this.updateReadStatusForMessages(n);let o=i.concat(this.messages);this.messages=o,t?setTimeout(()=>{this.list.nativeElement.children[20].scrollIntoView({behavior:"instant",block:"end"})},100):this.content.scrollToBottom(1e3)}}})):this.apiService.showNoNetwork()}checkScrolling(e){0===e.detail.scrollTop&&this.hasPrevious&&!this.loadingPrevious&&(this.currentPage+=1,this.loadChat(this.currentPage,!0))}updateReadStatusForMessages(e){this.apiService.networkConnected&&this.apiService.updateMessageStatus(e).subscribe(e=>{console.log(e)})}sendLocationMessage(e,t){}getCurrentLocation(){return(0,c.mG)(this,void 0,void 0,function*(){const e=yield l.getCurrentPosition();e?this.sendLocationMessage(e.coords.latitude,e.coords.longitude):this.apiService.showError("Geolocation unavailable !")})}clicGeoloc(){return(0,c.mG)(this,void 0,void 0,function*(){this.platform.is("capacitor")?yield l.checkPermissions().then(e=>{"granted"==e.location?this.getCurrentLocation():l.requestPermissions().then(e=>{"granted"==e.location&&this.getCurrentLocation()})}):navigator.geolocation&&navigator.geolocation.getCurrentPosition(e=>{console.log("============= POSITION  ================"),console.log(e),this.sendLocationMessage(e.coords.latitude,e.coords.longitude)},e=>{this.apiService.showError("Geolocation unavailable !")})})}clicCamera(){return(0,c.mG)(this,void 0,void 0,function*(){})}isDifferentDay(e){if(0===e)return!0;const t=new Date(this.messages[e-1].createdAt),s=new Date(this.messages[e].createdAt);return t.getFullYear()!==s.getFullYear()||t.getMonth()!==s.getMonth()||t.getDate()!==s.getDate()}getMessageDate(e){const t=new Date(this.messages[e].createdAt).toDateString();return this.dateMessage=t.slice(0,t.length-5),this.dateMessage}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(u.OX),a.Y36(d.C),a.Y36(r.F0),a.Y36(r.gz),a.Y36(W),a.Y36(o.t4))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-chat-page"]],viewQuery:function(e,t){if(1&e&&(a.Gf(J,7),a.Gf(o.q_,5,a.SBq)),2&e){let e;a.iGM(e=a.CRH())&&(t.content=e.first),a.iGM(e=a.CRH())&&(t.list=e.first)}},decls:26,vars:5,consts:[["no-border","","mode","ios"],["color","light","mode","ios"],["slot","start"],["mode","ios","color","dark","routerDirection","back","routerLink","/home"],["name","arrow-back-outline"],["color","primary"],["padding","",3,"scrollEvents","ionScroll"],["content",""],[4,"ngFor","ngForOf"],["color","light"],[1,"ion-align-items-center","attachments"],["size","6"],["autocapitalize","sentence","placeholder","Type a message","spellcheck","true","color","dark","autoGrow","true","rows","1",3,"ngModel","ngModelChange"],["size","2"],["color","dark","shape","round","fill","clear",3,"click"],["name","location-outline"],["name","camera-outline"],["shape","round","fill","clear",3,"disabled","click"],["name","paper-plane-outline"],[1,"chat"],["class","dateMessage",4,"ngIf"],[1,"timestamp"],["name","checkmark-done-circle-outline",4,"ngIf"],["name","ellipse-outline",4,"ngIf"],[1,"dateMessage"],["name","checkmark-done-circle-outline"],["name","ellipse-outline"]],template:function(e,t){1&e&&(a.TgZ(0,"ion-header",0),a.TgZ(1,"ion-toolbar",1),a.TgZ(2,"ion-buttons",2),a.TgZ(3,"ion-button",3),a._UZ(4,"ion-icon",4),a._uU(5,"Back "),a.qZA(),a.qZA(),a.TgZ(6,"ion-title",5),a._uU(7),a.qZA(),a.qZA(),a.qZA(),a.TgZ(8,"ion-content",6,7),a.NdJ("ionScroll",function(e){return t.checkScrolling(e)}),a.TgZ(10,"ion-list"),a.YNc(11,Y,11,10,"div",8),a.qZA(),a.qZA(),a.TgZ(12,"ion-footer"),a.TgZ(13,"ion-toolbar",9),a.TgZ(14,"ion-row",10),a.TgZ(15,"ion-col",11),a.TgZ(16,"ion-textarea",12),a.NdJ("ngModelChange",function(e){return t.messageToSend=e}),a.qZA(),a.qZA(),a.TgZ(17,"ion-col",13),a.TgZ(18,"ion-button",14),a.NdJ("click",function(){return t.clicGeoloc()}),a._UZ(19,"ion-icon",15),a.qZA(),a.qZA(),a.TgZ(20,"ion-col",13),a.TgZ(21,"ion-button",14),a.NdJ("click",function(){return t.clicCamera()}),a._UZ(22,"ion-icon",16),a.qZA(),a.qZA(),a.TgZ(23,"ion-col",13),a.TgZ(24,"ion-button",17),a.NdJ("click",function(){return t.sendMessage()}),a._UZ(25,"ion-icon",18),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(7),a.Oqu(t.username),a.xp6(1),a.Q6J("scrollEvents",!0),a.xp6(3),a.Q6J("ngForOf",t.messages),a.xp6(5),a.Q6J("ngModel",t.messageToSend),a.xp6(8),a.Q6J("disabled",""===t.messageToSend))},directives:[o.Gu,o.sr,o.Sm,o.YG,o.YI,r.rH,o.gu,o.wd,o.W2,o.q_,i.sg,o.fr,o.Nd,o.wI,o.g2,o.j9,n.JJ,n.On,i.O5,o.yp],pipes:[i.uU],styles:[".chat[_ngcontent-%COMP%], .dateMessage[_ngcontent-%COMP%]{display:flex;flex-direction:column}.dateMessage[_ngcontent-%COMP%]{align-self:center;margin-bottom:10px;margin-top:10px}.messageFromOther[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:.5em;max-width:70%;margin:.2em 0 .2em 13px;align-self:flex-start;background-color:#f1f0f0;color:#000;border-radius:10px 10px 10px 0;font-size:16px}.messageFromOther[_ngcontent-%COMP%]   .timestamp[_ngcontent-%COMP%]{font-size:12px;opacity:.6}.messageFromMe[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:.5em;max-width:70%;align-self:flex-end;background-color:#2636be;color:#fff;border-radius:10px 10px 0 10px;margin:.2em 13px .2em 0;font-size:16px}.messageFromMe[_ngcontent-%COMP%]   .timestamp[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;font-size:12px;opacity:.6;text-align:end}.attachments[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .messageFromMe[_ngcontent-%COMP%]   .timestamp[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:20px}"]}),e})()}];let R=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[r.Bz.forChild(D)],r.Bz]}),e})(),L=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[i.ez,n.u5,o.Pc,R]]}),e})()}}]);