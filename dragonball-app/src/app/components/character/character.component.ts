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

  constructor(private route: Router) { }

  @Input() character!: CharacterInterface;

  viewDetails(id: number) {
    console.log(id)
    this.route.navigate([`/detail/${id}`])
  }
}
