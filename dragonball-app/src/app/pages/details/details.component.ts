import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';
import { ApiService } from '@services/api.service';
import { CharacterDetailsInterface } from 'app/interfaces/character.interface';
import { catchError, of } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [IconComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailsComponent implements OnInit {

  @Input() id: number | undefined

  character?: CharacterDetailsInterface
  constructor(private api: ApiService, private route: Router, private location: Location) { }

  ngOnInit(): void {
    if (this.id == null || isNaN(this.id)) this.route.navigate(['..'])
    this.viewDetails(this.id!)
  }


  viewDetails(id: number) {
    this.api.getDetails(id).pipe(
      catchError(() => {
        return of(null);
      }),
    )
      .subscribe((res) => {
        if (res) this.character = {...res}
      });
  }

  goToBack(){
    this.location.back();
  }

}
