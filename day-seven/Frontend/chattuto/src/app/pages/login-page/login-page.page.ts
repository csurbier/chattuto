import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserManagerServiceService } from 'src/app/services/user-manager-service.service';
import { ApiserviceService } from 'src/app/services/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  public userForm: FormGroup;

  loading: any;
  constructor(
    public loadingController: LoadingController,
    public router: Router,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public userManager: UserManagerServiceService,
    public alertController: AlertController,
    public apiService: ApiserviceService,
    public authentificationService: AuthenticationService,
    public inAppBrowser: InAppBrowser) {

    this.userForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[€$@$!%*?&])[A-Za-z\d$@€$!%*?&].{8,}')
      ])]
    });
  }

  ngAfterViewInit() {
    SplashScreen.hide()
  }



  login() {

    let email = this.userForm.value["email"]
    let password = this.userForm.value["password"]
   
    //chek si le pseudo est disponible
    if (this.apiService.networkConnected) {
      this.apiService.showLoading();
      // Check email
      // Check email
      let params = {
        "email": email,
        "password": password,
      }
      this.authentificationService.login(params).then((resultat) => {
        this.apiService.stopLoading();
        if (resultat) {
          this.apiService.findUserWithQuery("?email="+email).subscribe((list) => {
            if (list) {
              let count = list["count"]
              console.log("Count " + count)
              if (count == 0) {
                this.apiService.showError('Identification failed ! No account found');
              }
              else {
                let result = list["results"][0]
                console.log(result)
                this.userManager.setUser(result).then((done) => {
                   // Next screen
                  console.log("===Can go to next screen")
                  this.router.navigateByUrl('/home', { replaceUrl: true });
                })

              }
            }
            else {
              this.apiService.showError("An error occured with credentials, no account found")
            }

          })
        }
        else {
         this.apiService.showError("An error occured with credentials")
        }
      })
    }
    else {
      this.apiService.showNoNetwork();
    }

  }

  cgu(){
    let url = "https://policies.google.com/terms"
    let target = "_blank"
    this.inAppBrowser.create(url, target, "location=no,zoom=no")
  }
  ngOnInit() {
  }

}
