import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';
import { CognitoService } from '../cognito.service';


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {

  constructor(public router: Router,
              public api: RestapiService,
              public cognito: CognitoService) { }

  ngOnInit() {
  }

  logOut(){
    const currentUser = this.cognito.getAuthentiicatedUser();
      if (currentUser != null) {
        currentUser.signOut();
        console.log("user is logged out!");
        this.router.navigate(['/home']);
      } else{
        console.log("no current user to log out")
      }
  }
  post() {
    this.api.postData();
  }

}
