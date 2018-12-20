import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RestapiService } from '../restapi.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public cognito: CognitoService,
              public router: Router, 
              public toastCtrl: ToastController,
              public api: RestapiService ) { }

  ngOnInit() {
  }

  login() {
    this.cognito.authenticate(this.email, this.password).then((res) => {
      console.log("user logged in!");
      console.log(res);
      console.log(res['idToken']['jwtToken']);
      this.presentToast();
    }, (err) => {
      console.log("user not logged in!");
      console.log(err);
    })
    this.router.navigate(['/homescreen'])
  }

  async presentToast(){ 
    const toast = await this.toastCtrl.create({
      color: "danger", 
      message: "You're signed in",  
      position: "middle", 
      showCloseButton: true, 
      closeButtonText: "It's Toasty!"
    });
     toast.present();
  }
    post() {
      this.api.postData();
    }
    
  }

