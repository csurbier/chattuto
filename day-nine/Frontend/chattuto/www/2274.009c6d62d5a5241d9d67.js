(self.webpackChunkchattuto=self.webpackChunkchattuto||[]).push([[2274],{2274:(e,t,o)=>{"use strict";o.r(t),o.d(t,{RegisterPagePageModule:()=>v});var r=o(1116),i=o(1462),s=o(6611),n=o(4905),a=o(8619),l=o(9002),c=o(4419),m=o(2767),u=o(3412);function p(e,t){1&e&&(a.TgZ(0,"p",23),a._uU(1,"Please filled all fields correctly"),a.qZA())}function d(e,t){1&e&&(a.TgZ(0,"ion-item"),a.TgZ(1,"p"),a._uU(2,"3 characters min."),a.qZA(),a.qZA())}function g(e,t){1&e&&(a.TgZ(0,"ion-item"),a.TgZ(1,"p"),a._uU(2,"3 characters min."),a.qZA(),a.qZA())}function h(e,t){1&e&&(a.TgZ(0,"ion-item"),a.TgZ(1,"p"),a._uU(2,"An email is required "),a.qZA(),a.qZA())}function Z(e,t){1&e&&(a.TgZ(0,"ion-item"),a.TgZ(1,"p"),a._uU(2,"min. 8 characters required with lowercase, uppercase, number and special character"),a.qZA(),a.qZA())}function f(e,t){1&e&&(a.TgZ(0,"ion-item"),a.TgZ(1,"p"),a._uU(2,"Please confirm password"),a.qZA(),a.qZA())}const A=[{path:"",component:(()=>{class e{constructor(e,t,o,r,s,n,a,l,c){this.loadingController=e,this.router=t,this.platform=o,this.alertController=r,this.apiService=s,this.formBuilder=n,this.inAppBrowser=a,this.userManager=l,this.authentificationService=c,this.submitAttempt=!1,this.showWrongPattern=!1,this.userForm=n.group({firstName:["",i.kI.compose([i.kI.minLength(3),i.kI.required])],lastName:["",i.kI.compose([i.kI.minLength(3),i.kI.required])],email:["",i.kI.compose([i.kI.required,i.kI.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])],password:["",i.kI.compose([i.kI.minLength(8),i.kI.required,i.kI.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\u20ac$@$!%*?&])[A-Za-zd$@\u20ac$!%*?&].{8,}")])],confirmpassword:["",i.kI.compose([i.kI.minLength(8),i.kI.required,i.kI.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\u20ac$@$!%*?&])[A-Za-zd$@\u20ac$!%*?&].{8,}")])]})}register(){this.submitAttempt=!0;let e=this.userForm.value.firstName,t=this.userForm.value.lastName,o=this.userForm.value.email,r=this.userForm.value.password;r!=this.userForm.value.confirmpassword?this.apiService.showError("Passwords don't match"):r.length<6||(this.apiService.networkConnected?this.apiService.showLoading().then(()=>{this.showWrongPattern=!1,this.createAccount({email:o,password:r,firstName:e,lastName:t})}):this.apiService.showNoNetwork())}createAccount(e){this.apiService.networkConnected?this.apiService.registerUser(e).subscribe(t=>{let o=t.status;if(console.log(o),"OK"==o){this.apiService.stopLoading();let o=t.data;console.log(o),this.userManager.setUser(o),this.authentificationService.login({email:e.email,password:e.password}).then(t=>{if(t){let t={first_name:e.firstName,last_name:e.lastName,lastConnexionDate:new Date};this.apiService.updateUser(this.userManager.currentUser.id,t).subscribe(e=>{console.log("resultat update ",e)}),this.userManager.saveUser(),console.log("===Can go to next screen"),this.router.navigateByUrl("/home",{replaceUrl:!0})}else this.apiService.stopLoading(),this.apiService.showError("An error occured with credentials")})}else{this.apiService.stopLoading();let e=t.error;console.log(e),this.apiService.showError(400==e.status?"An account already exists for this email. Please login":"An error occured")}}):(this.apiService.stopLoading(),this.apiService.showNoNetwork())}ngOnInit(){}ngAfterViewInit(){}cgu(){this.inAppBrowser.create("https://policies.google.com/terms","_blank","location=no,zoom=no")}}return e.\u0275fac=function(t){return new(t||e)(a.Y36(s.HT),a.Y36(n.F0),a.Y36(s.t4),a.Y36(s.Br),a.Y36(l.OX),a.Y36(i.qu),a.Y36(c.i),a.Y36(m.C),a.Y36(u.$))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-register"]],decls:39,vars:18,consts:[["color","medium","padding","","padding-24",""],[1,"auth-container"],[1,"form"],[1,"form-title"],["style","color: #ea6153;",4,"ngIf"],[3,"formGroup"],["lines","none","mode","ios","login-form",""],["slot","start",1,"sw-user-solid"],["formControlName","firstName","placeholder","LastName","type","text"],[4,"ngIf"],["mode","ios"],["formControlName","lastName","type","text","placeholder","FirstName"],["slot","start",1,"sw-email-solid"],["mode","ios","type","email","placeholder","Email","name","email","formControlName","email"],["slot","start",1,"sw-lock-sold"],["mode","ios","type","password","placeholder","Password","formControlName","password"],["mode","ios","type","password","placeholder","Confirm password","formControlName","confirmpassword"],["mode","ios","expand","block","color","danger",3,"disabled","click"],[1,"instruction",3,"click"],["no-border","","mode","ios","auth",""],["color","medium","mode","ios","text-center",""],[1,"option-auth"],["fill","clear","expand","block","routerLink","/login","mode","ios","color","danger"],[2,"color","#ea6153"]],template:function(e,t){1&e&&(a.TgZ(0,"ion-content",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"div",3),a._uU(4," Register "),a.qZA(),a.YNc(5,p,2,0,"p",4),a.TgZ(6,"form",5),a.TgZ(7,"ion-list",6),a.TgZ(8,"ion-item"),a._UZ(9,"ion-icon",7),a._UZ(10,"ion-input",8),a.qZA(),a.YNc(11,d,3,0,"ion-item",9),a.TgZ(12,"ion-item",10),a._UZ(13,"ion-icon",7),a._UZ(14,"ion-input",11),a.qZA(),a.YNc(15,g,3,0,"ion-item",9),a.TgZ(16,"ion-item",10),a._UZ(17,"ion-icon",12),a._UZ(18,"ion-input",13),a.qZA(),a.YNc(19,h,3,0,"ion-item",9),a.TgZ(20,"ion-item",10),a._UZ(21,"ion-icon",14),a._UZ(22,"ion-input",15),a.qZA(),a.YNc(23,Z,3,0,"ion-item",9),a.TgZ(24,"ion-item",10),a._UZ(25,"ion-icon",14),a._UZ(26,"ion-input",16),a.qZA(),a.YNc(27,f,3,0,"ion-item",9),a.qZA(),a.TgZ(28,"ion-button",17),a.NdJ("click",function(){return t.register()}),a._uU(29," Create account "),a.qZA(),a.qZA(),a.TgZ(30,"p",18),a.NdJ("click",function(){return t.cgu()}),a._uU(31,"By registering you are accepting our terms and conditions"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(32,"ion-footer",19),a.TgZ(33,"ion-toolbar",20),a.TgZ(34,"div",21),a.TgZ(35,"p"),a._uU(36,"Already a member ?"),a.qZA(),a.TgZ(37,"ion-button",22),a._uU(38,"Sign in"),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(5),a.Q6J("ngIf",t.submitAttempt),a.xp6(1),a.Q6J("formGroup",t.userForm),a.xp6(4),a.ekj("invalid",!t.userForm.controls.firstName.valid&&(t.userForm.controls.firstName.dirty||t.submitAttempt)),a.xp6(1),a.Q6J("ngIf",!t.userForm.controls.firstName.valid&&(t.userForm.controls.firstName.dirty||t.submitAttempt)),a.xp6(3),a.ekj("invalid",!t.userForm.controls.lastName.valid&&(t.userForm.controls.lastName.dirty||t.submitAttempt)),a.xp6(1),a.Q6J("ngIf",!t.userForm.controls.lastName.valid&&(t.userForm.controls.lastName.dirty||t.submitAttempt)),a.xp6(3),a.ekj("invalid",!t.userForm.controls.email.valid&&(t.userForm.controls.email.dirty||t.submitAttempt)),a.xp6(1),a.Q6J("ngIf",!t.userForm.controls.email.valid&&(t.userForm.controls.email.dirty||t.submitAttempt)),a.xp6(3),a.ekj("invalid",!t.userForm.controls.password.valid&&(t.userForm.controls.password.dirty||t.submitAttempt)),a.xp6(1),a.Q6J("ngIf",!t.userForm.controls.password.valid&&(t.userForm.controls.password.dirty||t.submitAttempt)),a.xp6(3),a.ekj("invalid",!t.userForm.controls.confirmpassword.valid&&(t.userForm.controls.confirmpassword.dirty||t.submitAttempt)),a.xp6(1),a.Q6J("ngIf",!t.userForm.controls.confirmpassword.valid&&(t.userForm.controls.confirmpassword.dirty||t.submitAttempt)),a.xp6(1),a.Q6J("disabled",!t.userForm.valid))},directives:[s.W2,r.O5,i._Y,i.JL,i.sg,s.q_,s.Ie,s.gu,s.pK,s.j9,i.JJ,i.u,s.YG,s.fr,s.sr,s.YI,n.rH],styles:["p[_ngcontent-%COMP%]{font-size:.8em;color:red}.option-auth[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}"]}),e})()}];let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[n.Bz.forChild(A)],n.Bz]}),e})(),v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[r.ez,i.u5,i.UX,s.Pc,w]]}),e})()}}]);