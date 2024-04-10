import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAuthService } from '../../../models/auth-service.interface';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequestDTO } from '@party-time/models';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PageHeaderComponent,
    NavbarComponent,
    FooterComponent,
  ],
  template: `<app-navbar></app-navbar>
    <section class="flex h-screen flex-col items-center justify-center">
      <app-page-header Title="Login" data-cy="login-header"></app-page-header>
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
        data-cy="login-form"
        class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white px-4 py-6 shadow-md"
      >
        <mat-form-field appearance="fill" data-cy="email-field">
          <mat-label>E-Mail</mat-label>
          <input matInput formControlName="email" data-cy="email-input" />
          <mat-error
            *ngIf="loginForm.get('email')?.errors?.['required']"
            data-cy="email-required-error"
          >
            E-Mail ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="loginForm.get('email')?.errors?.['email']"
            data-cy="email-email-error"
          >
            E-Mail ist ungültig.
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" data-cy="password-field">
          <mat-label>Passwort</mat-label>
          <input
            matInput
            formControlName="password"
            data-cy="password-input"
            type="password"
          />
          <mat-error
            *ngIf="loginForm.get('password')?.errors?.['required']"
            data-cy="password-required-error"
          >
            Passwort ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="loginForm.get('password')?.errors?.['minlength']"
            data-cy="password-minlength-error"
          >
            Passwort muss mindestens 8 Zeichen lang sein.
          </mat-error>
          <mat-error
            *ngIf="loginForm.get('password')?.errors?.['maxlength']"
            data-cy="password-maxlength-error"
          >
            Passwort darf maximal 30 Zeichen lang sein.
          </mat-error>
        </mat-form-field>
        <button
          mat-button
          [disabled]="!loginForm.valid"
          color="primary"
          type="submit"
          data-cy="login-button"
        >
          Login
        </button>
      </form>
    </section> `,
  styles: ``,
  providers: [AuthService],
})
export class LoginComponent {
  @Input() set email(email: string) {
    this.loginForm.patchValue({ email });
  }

  private authService: IAuthService = inject(AuthService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as LoginRequestDTO)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.snackBar.open('Login fehlgeschlagen', 'OK', {
              duration: 5000,
            });
          },
        });
    }
  }
}
