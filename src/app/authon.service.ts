import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthonService {
  // isLogin :boolean = false ;

  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false); //like observable but use with varibales

  userName: BehaviorSubject<string> = new BehaviorSubject('');

  //DI

  // run one time after every refresh - run on time in app
  constructor(private _HttpClient: HttpClient) {
    console.log('service constructor');

    afterNextRender(() => {
      if (localStorage.getItem('token') !== null) {
        //7ad 3aml login
        this.isLogin.next(true);
        this.setUserName();
      } else {
        this.isLogin.next(false);
      }
    });
  }

  setUserName() {
    let token: any = localStorage.getItem('token');
    let decodedToken: any = jwtDecode(token);
    this.userName.next(decodedToken.name);
  }


  signUp(userData: User): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  signIn(loginData: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      loginData
    );
  }
}

// 10:10 break



