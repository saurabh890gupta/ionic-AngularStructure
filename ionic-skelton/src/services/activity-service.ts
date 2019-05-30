import {Injectable} from "@angular/core";
import {ACTIVITIES} from "./mock-activities";
import { Http, RequestOptions, Headers } from '@angular/http';
import { config} from '../services/config'

@Injectable()
export class ActivityService {
  private activities: any;

  constructor(
    private http :Http,
    private config: config
  ) {
   // this.activities = ACTIVITIES;
  }


register(user){ debugger
  let heads = new Headers({
    "Content-Type": "application/x-www-form-urlencoded" 
    });
    let options = new RequestOptions({ headers: heads });
  return this.http.post(this.config.URL+ "?apicall=userRegister", user,options)
}

changPass(data){
  console.log("dataaaaaaaaaaaaaaaaa",data)
  let heads = new Headers({
    "Content-Type": "application/x-www-form-urlencoded" 
    });
    let options = new RequestOptions({ headers: heads });
  return this.http.post(this.config.URL+ "apicall=changepassword", data,options)
}









  // getAll() {
  //   return this.activities;
  // }

  // getItem(id) {
  //   for (var i = 0; i < this.activities.length; i++) {
  //     if (this.activities[i].id === parseInt(id)) {
  //       return this.activities[i];
  //     }
  //   }
  //   return null;
  // }

  // remove(item) {
  //   this.activities.splice(this.activities.indexOf(item), 1);
  // }
}
