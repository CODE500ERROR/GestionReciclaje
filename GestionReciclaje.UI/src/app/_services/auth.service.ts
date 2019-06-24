import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseApiUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;

constructor(private http: HttpClient) { }



  login(userLogin: any) {
    return this.http.post(this.baseApiUrl + 'token', userLogin)
                    .pipe(
                        map((response: any) => {
                           if (response) {
                               localStorage.setItem('token', response.accessToken.token);
                               this.decodedToken = this.jwtHelper.decodeToken(response.accessToken.token);
                               localStorage.setItem('userEmail',this.decodedToken.sub);
                           }
                        })
                    );
  }

  register(user: any) {
    return this.http.post(this.baseApiUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  initToken() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.currentUser = user;
    }
  }

  roleMatch(allowedRoles): boolean{

    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;

  }



}
