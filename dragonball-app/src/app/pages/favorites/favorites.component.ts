import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CharacterComponent } from '@components/character/character.component';
import { CharacterInterface } from 'app/interfaces/character.interface';
import { localStorageService } from '@services/localstorage.service';

@Component({
  selector: 'app-favorites',
  imports: [CharacterComponent],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FavoritesComponent {

  items: CharacterInterface[] = []

  constructor(private storage: localStorageService) {
    this.items = this.storage.favoritesSelected
   }
}
