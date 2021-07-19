import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {
  public submitAttempt: boolean = false;
  public userForm: FormGroup;

  showWrongPattern = false;
  constructor(
    public loadingController: LoadingController,
    public router: Router,
    public platform: Platform,
    public alertController: AlertController,
    public apiService: ApiserviceService,
    public formBuilder: FormBuilder,
    public inAppBrowser: InAppBrowser) {

    this.userForm = formBuilder.group({
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

  register() {
    this.submitAttempt = true;
    let firstName = this.userForm.value["firstName"]
    let lastName = this.userForm.value["lastName"]
    let email = this.userForm.value["email"]
    let password = this.userForm.value["password"]
    let confirmpassword = this.userForm.value["confirmpassword"]
     
    if (password != confirmpassword) {
      this.apiService.showError("Passwords don't match");
    }
    else if (password.length<6){
       
    }
    else {
      //chek si le pseudo est disponible
       
      if (this.apiService.networkConnected) {
        this.apiService.showLoading().then(() => {
          this.showWrongPattern=false;
          let params = {
                  "email": email,
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
      this.apiService.registerUser(params).subscribe((resultat) => {
        let status = resultat["status"];
        console.log(status)
        if (status == "OK") {
          this.apiService.stopLoading();
          //User created 
          let data = resultat["data"]
          console.log(data)
        }
        else {
          this.apiService.stopLoading();
          let error = resultat["error"]
          console.log(error)
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
      this.apiService.stopLoading();
      this.apiService.showNoNetwork()
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }



  cgu() {
    // Your CGU url
    let url = "https://policies.google.com/terms"
    let target = "_blank"
    this.inAppBrowser.create(url, target, "location=no,zoom=no")
  }


}
