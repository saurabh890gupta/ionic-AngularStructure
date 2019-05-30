import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { AlertController, ToastController} from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { } from "ionic-angular";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
//import {AppModule} from "../app/app.module"
import { ActivityService } from '../services/activity-service'
export interface MenuItem {
    title: string;
    component: any;
    icon: string;
    
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public changCtrl: AlertController,
    public toastCtrl: ToastController,
    public authservice: ActivityService
    
   // public AppModule:AppModule
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},
      {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'},
      {title: 'Chang Password', component: '', icon: 'build'},
      {title: 'log out', component: HomePage, icon: 'build'},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    console.log(page)
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title !== 'Chang Password')
     this.nav.setRoot(page.component);
    if(page.title == 'Chang Password') 
    this.changPass()
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
  changPass() {
    let changPass = this.changCtrl.create({
      title: '',
      message:"Change Password",
      cssClass: 'modalCss',
      inputs: [
                {
                  name: 'password',
                  placeholder: 'password',
                  type: 'password',
                  
                },
                {
                  name: 'confirm_password',
                  placeholder: 'confirm password',
                  type: 'password'
                },
      ],
      buttons: [
        // {
        //   text: 'Cancel',
        //   handler: data => {
        //     console.log('Cancel clicked');
        //   }
        // },
        {
          text: 'Change Password',
          handler: data => {
            console.log('Send clicked');
            console.log('data clicked data',data);
            if(!data.password ||!data.confirm_password){
              let toast = this.toastCtrl.create({
                message: 'password is blank',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
              return false;
            }
            else if(data.confirm_password!=data.password){
              let toast = this.toastCtrl.create({
                message: 'password is not match',
                duration: 3000,
                position: 'top',
                cssClass: 'dark-trans',
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
              return false;
            }
            else {
              this.authservice.changPass(data).subscribe((data:any)=>{
                console.log(data)
                let toast = this.toastCtrl.create({
                  message: 'password chang successfully',
                  duration: 3000,
                  position: 'top',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
              
              
              
              })
             
            }
          }
        }
      ]
    });
    changPass.present();
  }

}
