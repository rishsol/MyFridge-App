import { Injectable } from '@angular/core';
import { Form } from '../model/form'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor (private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/user/signup', authData)
      .subscribe(res => {
        console.log(res);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string}>('http://localhost:3000/user/login', authData)
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        this.authStatusListener.next(true);
      });
  }


}
