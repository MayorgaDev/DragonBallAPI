import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Account, Credentials } from 'app/interfaces/account.interface';
import { CharacterDetailsInterface, CharacterInterface } from 'app/interfaces/character.interface';
import { localStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  favorites: CharacterInterface[] = [];
  constructor(private http: HttpClient, private storage: localStorageService) { }

  private serverAPI = 'http://localhost:3000';
  private dragonBallAPI = 'https://dragonball-api.com/api';

  login(data: Credentials): Observable<Account> {
    return this.http.post<Account>(this.serverAPI + '/login', data);
  }

  createAccount(data: Credentials): Observable<Account> {
    return this.http.post<Account>(this.serverAPI + '/create-account', data);
  }

  getDetails(id: number): Observable<CharacterDetailsInterface> {
    return this.http.get<CharacterDetailsInterface>(`${this.dragonBallAPI}/characters/${id}`).pipe(map( r => {
     return r
    }));
  }

  searchCharacter(name: string): Observable<CharacterInterface[]> {
    return this.http.get<any>(`${this.dragonBallAPI}/characters?limit=100&name=${name}`).pipe(
      map(r => {
        // Si la API responde con un array directamente, lo devolvemos
        if (Array.isArray(r))  return this.validateFavorite(r);
        // Si la API responde con un objeto con paginación, extraemos los personajes
        if (r && r.items) return this.validateFavorite(r.items);
        return []; 
      })
    );
  }

  validateFavorite(characters: any[]){
    return characters.map((c) => {
      return {...c, favorite: this.storage.isFavorite(c.id)}
    }) 
  }

}
