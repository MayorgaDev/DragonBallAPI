import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';
import { CharacterComponent } from '@components/character/character.component';
import { CharacterInterface } from 'app/interfaces/character.interface';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-index',
  imports: [IconComponent, CharacterComponent],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {

  items: CharacterInterface[] = [
    {
      "id": 13,
      "name": "Yamcha",
      "race": "Human",
      "gender": "Male",
      "image": "https://dragonball-api.com/characters/Final_Yamcha.webp",
    },
    {
      "id": 14,
      "name": "Chi-Chi",
      "race": "Human",
      "gender": "Female",
      "image": "https://dragonball-api.com/characters/ChiChi_DBS.webp",
    },
    {
      "id": 15,
      "name": "Gotenks",
      "race": "Saiyan",
      "gender": "Male",
      "image": "https://dragonball-api.com/characters/Gotenks_Artwork.webp",
    },
    {
      "id": 16,
      "name": "Trunks",
      "race": "Saiyan",
      "gender": "Male",
      "image": "https://dragonball-api.com/characters/Trunks_Buu_Artwork.webp",
    }

  ]

  constructor(private api: ApiService, private route: Router) { }

  searchCharacter = () => {
    console.log('searchs')
  }

  search(name: string) {
    this.api.searchCharacter(name).pipe(
      catchError(() => {
        return of(null);
      }),
    )
      .subscribe((res) => {
        if (res) {
          this.items = res
        }
      });
  }
}
