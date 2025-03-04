import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthsessionService {

  private token: string | undefined

  constructor() { 
    this.token = localStorage.getItem('token') ?? undefined;
  }

  get isAuto(): boolean { return !!this.token };

  set setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  };
  
  deleteToken() {
    this.token = undefined;
    localStorage.removeItem('token');
  };

}
