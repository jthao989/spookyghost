import { Injectable} from '@angular/core';
import {CognitoService} from '../app/cognito.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private cognitoService: CognitoService,
    private http: HttpClient) {}

  postData() {
    let myUser = this.cognitoService.getAuthentiicatedUser();
    if (myUser === null) {
      console.log("user is null");
      return;
    }
    myUser.getSession((err, session) => {
      if (err) {
        console.log("post error: ", err);
        return;
      }
      console.log('post session ', session);
      const token = session['idToken']['jwtToken'];
      session.getIdToken().getJwtToken(); 
      console.info('post  token ', token);

      let myHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": token
      });
      console.log('post headers', myHeaders);

      let postData = {
        'Name': 'James',
        'Email': 'JamesIsTheGreatest@gmail.com',
        'Age': '20032'
      }
      console.log("postData: ", postData);
      
      // https://7glmgmyy1f.execute-api.us-east-2.amazonaws.com/TestDev/petfood
      
      this.http.post('https://vbhnadca6b.execute-api.us-east-2.amazonaws.com/testtest/petfood', JSON.stringify(postData))
      .subscribe(response => {
        console.log("post success: ", response);


      }, err => {
        console.log("post error ", err);
      });

    });

  }



}


