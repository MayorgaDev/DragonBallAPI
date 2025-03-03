import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { CharacterDetailsInterface } from 'app/interfaces/character.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {

  @Input() id: number | undefined

  character?: CharacterDetailsInterface
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    if (this.id == null || isNaN(this.id)) {
      this.route.navigate(['..'])
    }
    this.viewDetails(this.id!)
  }


  viewDetails(id: number) {
    this.api.getDetails(id).pipe(
      catchError(() => {
        return of(null);
      }),
    )
      .subscribe((res) => {
        if (res) {
          this.character = res
        }
      });
  }

}
