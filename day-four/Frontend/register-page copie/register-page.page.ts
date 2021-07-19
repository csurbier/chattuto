import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/api-service.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {
  public submitAttempt: boolean = false;
  public slideOneForm: FormGroup;

  showWrongPattern = false;
  constructor(
    // public fb: Facebook,
    // public  googlePlus: GooglePlus,
    public loadingController: LoadingController,
    public router: Router,
    public platform: Platform,
    public alertController: AlertController,
    public apiService: ApiserviceService,
    public formBuilder: FormBuilder,
    public authentificationService: AuthenticationService,
    public changeDetector: ChangeDetectorRef,
    public inAppBrowser: InAppBrowser) {

    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[€$@$!%*?&])[A-Za-z\d$@€$!%*?&].{8,}')
      ])],
      confirmpassword: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[€$@$!%*?&])[A-Za-z\d$@€$!%*?&].{8,}')
      ])],
    });

  }

  ngAfterViewInit() {
  }



  register() {
    this.submitAttempt = true;
    console.log(this.slideOneForm.value);
    let firstName = this.slideOneForm.value["firstName"]
    let lastName = this.slideOneForm.value["lastName"]
    let email = this.slideOneForm.value["email"]
    let password = this.slideOneForm.value["password"]
    let confirmpassword = this.slideOneForm.value["confirmpassword"]

    if (password != confirmpassword) {
      this.apiService.showError("Passwords don't match");
    }
    else if (password.length < 6) {

    }
    else {
      //chek si le pseudo est disponible
      let refCompany = "";
      if (this.apiService.networkConnected) {
        this.apiService.showLoading().then(() => {
          this.showWrongPattern = false;
          let params = {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "password": password,
          }
          this.createAccount(params)



        })
      }
      else {
        this.apiService.showNoNetwork();
      }
    }
  }

  createAccount(params) {
    if (this.apiService.networkConnected) {
      // Création du compte.
      console.log(params)
      this.apiService.registerUser(params).subscribe((resultat) => {
        let status = resultat["status"];
        console.log(status)
        if (status == "OK") {

          let data = resultat["data"]
          console.log(data)
          this.userManager.setUser(data)

          let paramsToLogin = {
            "email": params.email,
            "password": params.password,
          }
          this.authentificationService.login(paramsToLogin).then((resultat) => {

            if (resultat) {
              //Need to update username and lastname
              let updateParams = {
                "first_name": params.first_name,
                "last_name": params.last_name,
              }
              this.apiService.updateUser(this.userManager.currentUser.id, updateParams).subscribe((done) => {
                console.log("resultat update ", done)
              })
              //Automatically create an appprofile for our user
              console.log("Authenticated")
              let paramsProfile = {
                "user": this.userManager.currentUser.id,
                "online": true,
                "lastConnexionDate": new Date()
              }
              console.log(paramsProfile)
              this.apiService.createUserDetail(paramsProfile).subscribe((resultat) => {
                if (resultat) {
                  this.apiService.stopLoading();
                  let appProfile = new UserDetail().initWithJSON(resultat)
                  console.log("=== userDetail ", appProfile)
                  this.userManager.currentUser.userdetail = appProfile;
                  this.userManager.saveUser()
                  // Next screen

                }
                else {
                  this.apiService.stopLoading();
                  this.apiService.showError("An error occured")
                }
              })

            }
            else {
              this.apiService.stopLoading();
              this.apiService.showError("An error occured")
            }
          })
        }
        else {
          this.apiService.stopLoading();
          let error = resultat["error"]
          if (error.status == 400) {
            this.apiService.showError('An account already exists for this email. Please login');
          }
          else {
            this.apiService.showError("An error occured")
          }

        }
      })
    }
    else {
      this.apiService.showNoNetwork()
    }
  }

  cgu() {
    // Your CGU url
    let url = "https://policies.google.com/terms"
    let target = "_blank"
    this.inAppBrowser.create(url, target, "location=no,zoom=no")
  }

  ngOnInit() {
  }
}
