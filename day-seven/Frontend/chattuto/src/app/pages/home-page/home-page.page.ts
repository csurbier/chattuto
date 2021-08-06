import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    SplashScreen.hide()
  }

}
