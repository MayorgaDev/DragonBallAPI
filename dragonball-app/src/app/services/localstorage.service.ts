import { Injectable } from '@angular/core';
import { CharacterInterface } from 'app/interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class localStorageService {

  private favorites: CharacterInterface[]
  private key: string = 'favorites';

  constructor() { 
    const f = localStorage.getItem('favorites');
    this.favorites = f ? JSON.parse(f) : [];
}

  isFavorite(id: number): boolean {
    const ar = this.favorites?.map((i: { id: Number }) => i.id) ?? [];
    return ar.includes(id); 
  };

  set setFavorite(character: CharacterInterface) {
    if (character !== null) {
        const i = this.favorites?.findIndex((i) => i.id == character.id)
        character.favorite = true
        i >= 0
          ? this.favorites.splice(i, 1)
          : this.favorites.push(character);
  
        localStorage.setItem(this.key, JSON.stringify(this.favorites));
      }
  };
  
  get favoritesSelected(): CharacterInterface[] {
    return this.favorites
  }
}