import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { IAccountService } from '../../../models/account-service.interface';
import { AccountService } from '../../../services/account/account.service';
import { CustomValidators } from '../../../validators/custom.validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccountDTO,
  AccountRegisterDTO,
} from '../../../models/dto/account-dto.interface';
import { ApiError } from '../../../models/error.interface';

@Component({
  selector: 'app-register',
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
  template: `
    <app-navbar></app-navbar>
    <section class="flex h-screen flex-col items-center justify-center">
      <app-page-header
        Title="Account erstellen"
        data-cy="register-header"
      ></app-page-header>
      <form
        [formGroup]="registerForm"
        (ngSubmit)="onSubmit()"
        data-cy="register-form"
        class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white px-4 py-6 shadow-md"
      >
        <mat-form-field appearance="fill" data-cy="name-field">
          <mat-label>Benutzername</mat-label>
          <input matInput formControlName="name" data-cy="name-input" />
          <mat-error
            *ngIf="registerForm.get('name')?.errors?.['required']"
            data-cy="name-required-error"
          >
            Benutzername ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('name')?.errors?.['minlength']"
            data-cy="name-minlength-error"
          >
            Der Benutzername muss mindestens 5 Zeichen lang sein.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('name')?.errors?.['maxlength']"
            data-cy="name-maxlength-error"
          >
            Der Benutzername darf maximal 20 Zeichen lang sein.
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" data-cy="email-field">
          <mat-label>Email</mat-label>
          <input
            type="email"
            matInput
            formControlName="email"
            data-cy="email-input"
          />
          <mat-error
            *ngIf="registerForm.get('email')?.errors?.['required']"
            data-cy="email-required-error"
          >
            E-Mail ist erforderlich.
          </mat-error>

          <mat-error
            *ngIf="registerForm.get('email')?.errors?.['email']"
            data-cy="email-invalid-error"
          >
            Bitte geben Sie eine gültige E-Mail-Adresse ein.
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" data-cy="password-field">
          <mat-label>Passwort</mat-label>
          <input
            type="password"
            matInput
            formControlName="password"
            data-cy="password-input"
          />
          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['required']"
            data-cy="password-required-error"
          >
            Passwort ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['minlength']"
            data-cy="password-minlength-error"
          >
            Das Passwort muss mindestens 8 Zeichen lang sein.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['maxlength']"
            data-cy="password-maxlength-error"
          >
            Das Passwort darf maximal 30 Zeichen lang sein.
          </mat-error>

          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['uppercaseRequired']"
          >
            Mindestens ein Großbuchstabe ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['lowercaseRequired']"
          >
            Mindestens ein Kleinbuchstabe ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['numberRequired']"
          >
            Mindestens eine Zahl ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="registerForm.get('password')?.errors?.['specialCharRequired']"
          >
            Mindestens ein Sonderzeichen ist erforderlich.
          </mat-error>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          class="mt-12"
          [disabled]="!registerForm.valid"
          data-cy="register-submit-btn"
        >
          Registrieren
        </button>
      </form>
    </section>
    <app-footer></app-footer>
  `,
  styles: [],
  providers: [AccountService],
})
export class RegisterComponent {
  private accountService: IAccountService = inject(AccountService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      CustomValidators.passwordStrength,
    ]),
  });

  private navigateToVerifikation(email = '') {
    this.router.navigate(['/auth/verify'], {
      queryParams: { email },
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.accountService
        .register(this.registerForm.value as AccountRegisterDTO)
        .subscribe({
          next: (response: AccountDTO) => {
            console.log('Registration successful:', response);
            this.snackBar
              .open('Registrierung erfolgreich!', 'zur Verifikation', {
                duration: 5000,
              })
              .afterDismissed()
              .subscribe(() => {
                this.navigateToVerifikation(response.email);
              });
          },
          error: (apiError: ApiError) => {
            console.error('Registration error:', apiError);
            this.snackBar.open(apiError.message, 'OK', {
              duration: 5000,
            });
          },
        });
    }
  }
}
