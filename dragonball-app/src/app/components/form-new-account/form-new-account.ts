import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';
import { ApiService } from '@services/api.service';
import { AuthsessionService } from '@services/authsession.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-form-new-account',
  imports: [IconComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './form-new-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNewAccountComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  typeInput: string = 'password';

  constructor(private f: FormBuilder,
    private api: ApiService,
    private route: Router) {
    this.loginForm = this.f.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')]]
    })
  }

  showPassword() {
    this.typeInput = this.typeInput == 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.api.createAccount({
        'email': this.loginForm.get('email')?.value,
        'password': this.loginForm.get('password')?.value
      })
        .pipe(
          catchError((error) => {
            if (error.status === 400) {
              this.errorMessage = error.error.message;
            }

            return of(null);
          }),
        )
        .subscribe((res) => {
          if (res) {
            this.route.navigate(['/'])
          }
        });

    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}