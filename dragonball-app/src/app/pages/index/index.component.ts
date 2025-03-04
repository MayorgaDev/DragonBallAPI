import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';
import { CharacterComponent } from '@components/character/character.component';
import { CharacterInterface } from 'app/interfaces/character.interface';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthsessionService } from '@services/authsession.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  imports: [IconComponent, CharacterComponent, FormsModule],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class IndexComponent {

  items: CharacterInterface[] = []

  search: string = '';
  constructor(private api: ApiService, private route: Router, private session: AuthsessionService) { 
    this.searchCharacters()
  }

  searchCharacters() {
    this.api.searchCharacter(this.search).pipe(
      catchError(() => {
        return of(null);
      }),
    )
      .subscribe((res) => {
        if (res) this.items = res
      });
  }

  goToFavorites() {
    this.route.navigate(['/favorites'])
  }

  logout() {
    this.session.deleteToken();
    this.route.navigate(['/']);
  }
}
