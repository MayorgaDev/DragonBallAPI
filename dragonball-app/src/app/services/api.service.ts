import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Credentials } from 'app/interfaces/account.interface';
import { CharacterDetailsInterface, CharacterInterface } from 'app/interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private serverAPI = 'http://localhost:3000';
  private dragonBallAPI = 'https://dragonball-api.com/api';

  login(data: Credentials): Observable<Account> {
    return this.http.post<Account>(this.serverAPI + '/login', data);
  }

  createAccount(data: Credentials): Observable<Account> {
    return this.http.post<Account>(this.serverAPI + '/create-account', data);
  }

  getDetails(id: number): Observable<CharacterDetailsInterface> {
    return this.http.get<CharacterDetailsInterface>(`${this.dragonBallAPI}/characters/${id}`);
  }

  searchCharacter(name: string): Observable<CharacterInterface[]> {
    return this.http.get<CharacterInterface[]>(`${this.dragonBallAPI}/characters?limit=100&name=${name}`);
  }

}
