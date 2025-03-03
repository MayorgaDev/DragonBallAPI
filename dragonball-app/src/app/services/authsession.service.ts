import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthsessionService {

  private token: string | undefined

  constructor() { }

  get isAuto(): boolean { return !!this.token };

  set setToken(token: string) {
    this.token = token;
  };

}
