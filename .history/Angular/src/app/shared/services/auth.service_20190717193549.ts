import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
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
    return this.http.post(this.baseApiUrl + 'Login', userLogin)
                    .pipe(
                        map((response: any) => {
                           if (response) {
                               localStorage.setItem('token', response.token);
                               this.decodedToken = this.jwtHelper.decodeToken(response.token);
                               localStorage.setItem('userEmail',this.decodedToken.unique_name);
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
    const userRoles = this.decodedToken != null ? this.decodedToken.role as Array<string> : [];
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;

  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.decodedToken = null;
    this.currentUser = null;
  }



}
