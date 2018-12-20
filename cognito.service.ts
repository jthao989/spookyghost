import * as AWSCognito from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {


  private pool_data={
    UserPoolId:"us-east-2_9greDVpHt",
    ClientId:"4lmqfkemdcodog3ftqd0hqesff"
  }

  public userPool= new AWSCognito.CognitoUserPool(this.pool_data);


  constructor() {} 

signUp(email, password) {
  return new Promise((resolved, reject) => {
    let userAttribute = [];
      userAttribute.push(...
      [new AWSCognito.CognitoUserAttribute({
      Name:"email", Value: email})]
      );
    this.userPool.signUp(email, password, userAttribute, null,
      function(err, result){
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
  });

}

confirmUser(verificationCode, userName){
  return new Promise((resolved, reject) => {
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: userName, 
      Pool: this.userPool
    });
    cognitoUser.confirmRegistration(verificationCode, true,
      function(err, result){
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
  });
}

authenticate(email,password){
  return new Promise((resolved, reject) => {

    const authDetails = new AWSCognito.AuthenticationDetails({
      Username: email,
      Password: password
    });
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: email,
      Pool: this.userPool
    });

    cognitoUser.authenticateUser(authDetails,{
      onSuccess: result => {
        console.log('user was authenticated!');
        resolved(result);
      },
      onFailure: err => {
        console.log('user was not authenticated!');
        reject(err);
      },
      newPasswordRequired: userAttributes => {
        userAttributes.email = email;
        delete userAttributes.email_verified;

        cognitoUser.completeNewPasswordChallenge(password, userAttributes,{
          onSuccess: function(result) {},
          onFailure: function(error) {
            reject(error);
          }
        });
      }
    });
  });
}


getAuthentiicatedUser(){
  return this.userPool.getCurrentUser();
}}

//hint: LIKELY to return an object. After logging in, it should take you to a page. 