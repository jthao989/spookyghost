import {Component, OnInit} from '@angular/core';
import {CognitoService} from '../cognito.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {async} from '@angular/core/testing';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email:string;
  password:string;
  alertController: any;
  

  constructor(public cognitoService:CognitoService, 
              public alertCtrl:AlertController, 
              public router:Router) {}
              
  
  ngOnInit() {
  }



register(){
  this.cognitoService.signUp(this.email, this.password) .then(
    res => {
      this.promptVerificationCode();
    },
    err => {
      console.log(err);
    }
  );
}
  async promptVerificationCode(){
    let alert = await this.alertCtrl.create({
      message: "Enter Verification Code",
      inputs: [{
        name: "VerificationCode",
        placeholder: "Verification Code"
      }
    ],
    buttons: [
      {
      text:"Cancel",
      role:"cancel",
      handler: data => {
        console.log("Cancel clicked");
      }
    },
  {
    text:"Verify",
    handler: data => {
      this.verifyUser(data.VerificationCode);
    }
  }
]
    });
    await alert.present();
  }


verifyUser(verificationCode){
    this.cognitoService.confirmUser(verificationCode, this.email) .then(
      res => {
        console.log(res);
        this.successAlert();
      },
      err => {
        alert(err.message);
      }
    );
  }
    async successAlert() {
      const alert = await this.alertCtrl.create({
      header: "Success",
      message: "You are now registered!",
      buttons: ["Sweet!"]
    });
    alert.onDidDismiss().then( () => {
      this.router.navigate(['/home']);
    });
    await alert.present();
}

}