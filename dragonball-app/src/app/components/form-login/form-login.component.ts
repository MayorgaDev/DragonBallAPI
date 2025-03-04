import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { IconComponent } from '@components/icon/icon.component';
import { Router, RouterLink } from '@angular/router';
import { AuthsessionService } from '@services/authsession.service';
import { ApiService } from '@services/api.service';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule, IconComponent, RouterLink],
  templateUrl: './form-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  typeInput: String = 'password';

  constructor(private f: FormBuilder, 
    private session: AuthsessionService, 
    private api: ApiService, 
    private route: Router) {
    this.loginForm = this.f.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })


  }

  showPassword() {
    this.typeInput = this.typeInput == 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.api.login({
        'email': this.loginForm.get('email')?.value,
        'password': this.loginForm.get('password')?.value
      })
        .pipe(
          catchError((error) => {
            if (error.status === 403) {
             this.errorMessage = error.error.message;
            }

            return of(null);
          }),
        )
        .subscribe((res) => {
          if (res) {
            this.session.setToken = res.token
            this.route.navigate(['/index'])
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