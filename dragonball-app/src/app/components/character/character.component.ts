import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CharacterInterface } from 'app/interfaces/character.interface';
import { IconComponent } from '@components/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [IconComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {

  isFavorite: boolean = false;
  favorites: number[] = [];
  key: string = 'favorites';
  constructor(private route: Router) { }

  @Input() character!: CharacterInterface;

  viewDetails(id: number) {
    console.log(id)
    this.route.navigate([`/detail/${id}`])
  }

  addFavorites(id: number) {
    if (id !== null) {
      this.isFavorite = true;
      const favs = localStorage.getItem(this.key);
      this.favorites = favs ? JSON.parse(favs) : [];

      const i = this.favorites.findIndex((i) => i == id)
      i >= 0
        ? this.favorites.splice(i, 1)
        : this.favorites.push(id);

      localStorage.setItem(this.key, JSON.stringify(this.favorites));
    }
  }
}
