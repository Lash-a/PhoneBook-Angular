import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Login } from './Login';
import { RegistrationModel } from './Registration-model';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  loggedIn: boolean;
  reqUrl: string = "https://localhost:44393/api/Registration/";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
   };

  logIntoAcc(login: Login): Observable<Login>{

    let token: string = this.cookie.get('access_token');

    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + token
    });

        const httpOptions = {
          headers: headers_object
        };
    return this.http.post<Login>(this.reqUrl + "CheckIfUserExists", JSON.stringify(login), httpOptions)
  };


  getToken(userName: string, password: string): Observable<any>{
    let data = "userName="+userName+"&password="+password+"&grant_type=password";
    let reqHeader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post("https://localhost:44393/token", data, {headers: reqHeader});
  };

  registerAccount(registerForm: RegistrationModel){
    return this.http.post<RegistrationModel>(this.reqUrl + "RegisterUser", JSON.stringify(registerForm), this.httpOptions);
  };

  checkIfEmailExists(registerForm: RegistrationModel){
    return this.http.post<RegistrationModel>(this.reqUrl + "CheckIfEmailExists", JSON.stringify(registerForm), this.httpOptions);
  };

}