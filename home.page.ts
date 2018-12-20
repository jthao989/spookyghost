import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor (private router: Router,
                  public cognito: CognitoService) {  }

ngOnInit(){
  console.log('making sure logged in...');
  const currentUser = this.cognito.getAuthentiicatedUser();
  console.log(currentUser); 
  // currentUser.signOut();
  if (currentUser != null){
    console.log('to to main app page');
    this.router.navigate(['/homescreen']);
  } else{
    console.log('go current user logged in...');
    console.log('stay at login');
  }
}


goToLogin() {
  this.router.navigate(['/login'])

}
goToSignUp() {
  this.router.navigate(['/signup'])   
} 
}
