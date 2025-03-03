import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-icon',
  imports: [],
  // templateUrl: './icon.component.html',
  template: '<i [className]="iconClass">',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent { 
  @Input() iconClass: string = 'bx bx-home';
}
