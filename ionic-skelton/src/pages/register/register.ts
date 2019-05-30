import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { ActivityService } from '../../services/activity-service'


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user= {
    username: '',
    state: '',
    mobile: '',
    password: '',
    userType: ''  }
  constructor(public nav: NavController,
    public authservice: ActivityService) {
  }

  // register and go to home page
  register(user) {
    debugger
    this.authservice.register(user).subscribe((data:any)=>{
      console.log(data)
    })
    
  }

  // go to login page
  login() {
   this.nav.setRoot(LoginPage);
  }
}
