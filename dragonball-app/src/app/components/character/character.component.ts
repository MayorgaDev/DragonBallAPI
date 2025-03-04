import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CharacterInterface } from 'app/interfaces/character.interface';
import { IconComponent } from '@components/icon/icon.component';
import { Router } from '@angular/router';
import { localStorageService } from '@services/localstorage.service';

@Component({
  selector: 'app-character',
  imports: [IconComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {

  isFavorite: boolean = false;
  favorites: CharacterInterface[] = [];
  key: string = 'favorites';
  constructor(private route: Router, private storage: localStorageService) { }

  @Input() character!: CharacterInterface;

  viewDetails(id: number) {
    this.route.navigate([`/detail/${id}`])
  }

  addFavorites(character: CharacterInterface) {
    if (character !== null) {
      this.isFavorite = !this.isFavorite;
      this.storage.setFavorite = character
    }
  }
}
