import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAuthService } from '../../../models/auth-service.interface';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomValidators } from '../../../validators/custom.validators';
import { IAccountService } from '../../../models/account-service.interface';
import { AccountService } from '../../../services/account/account.service';
import { ApiError, ChangePasswordDTO } from '@party-time/models';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';

@Component({
  selector: 'app-change-password',
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
      <app-page-header
        Title="Passwort ändern"
        data-cy="change-password-header"
      ></app-page-header>
      <form
        [formGroup]="changePasswordForm"
        (ngSubmit)="onSubmit()"
        data-cy="change-password-form"
        class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white px-4 py-6 shadow-md"
      >
        <mat-form-field appearance="fill" data-cy="old-password-field">
          <mat-label>Altes Passwort</mat-label>
          <input
            matInput
            formControlName="oldPassword"
            data-cy="old-password-input"
            type="password"
          />
          <mat-error
            *ngIf="changePasswordForm.get('oldPassword')?.errors?.['required']"
            data-cy="old-password-required-error"
          >
            Altes Passwort ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="changePasswordForm.get('oldPassword')?.errors?.['minlength']"
            data-cy="old-password-minlength-error"
          >
            Altes Passwort muss mindestens 8 Zeichen lang sein.
          </mat-error>
          <mat-error
            *ngIf="changePasswordForm.get('oldPassword')?.errors?.['maxlength']"
            data-cy="old-password-maxlength-error"
          >
            Altes Passwort darf maximal 30 Zeichen lang sein.
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" data-cy="new-password-field">
          <mat-label>Neues Passwort</mat-label>
          <input
            matInput
            formControlName="newPassword"
            data-cy="new-password-input"
            type="password"
          />
          <mat-error
            *ngIf="changePasswordForm.get('newPassword')?.errors?.['required']"
            data-cy="new-password-required-error"
          >
            Neues Passwort ist erforderlich.
          </mat-error>
          <mat-error
            *ngIf="changePasswordForm.get('newPassword')?.errors?.['minlength']"
            data-cy="new-password-minlength-error"
          >
            Neues Passwort muss mindestens 8 Zeichen lang sein.
          </mat-error>
          <mat-error
            *ngIf="changePasswordForm.get('newPassword')?.errors?.['maxlength']"
            data-cy="new-password-maxlength-error"
          >
            Neues Passwort darf maximal 30 Zeichen lang sein.
          </mat-error>
          <mat-error
            *ngIf="changePasswordForm.get('newPassword')?.errors?.['passwordStrength']"
            data-cy="new-password-strength-error"
          >
            Das Passwort muss mindestens eine Zahl, einen Großbuchstaben, einen
            Kleinbuchstaben und ein Sonderzeichen enthalten.
          </mat-error>
        </mat-form-field>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          data-cy="submit-button"
        >
          Passwort ändern
        </button>
      </form>
    </section>
    <app-footer></app-footer>`,

  providers: [AccountService],
  styles: ``,
})
export class ChangePasswordComponent {
  private accountService: IAccountService = inject(AccountService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      CustomValidators.passwordStrength,
    ]),
  });

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.accountService
        .changePassword(this.changePasswordForm.value as ChangePasswordDTO)
        .subscribe({
          next: () => {
            this.snackBar.open('Passwort erfolgreich geändert!', 'OK', {
              duration: 5000,
            });
            this.changePasswordForm.reset(
              {
                oldPassword: '',
                newPassword: '',
              },
              { emitEvent: false }
            );

            Object.keys(this.changePasswordForm.controls).forEach((key) => {
              const control = this.changePasswordForm.get(key);
              control?.markAsPristine();
              control?.markAsUntouched();
              control?.setErrors(null);
            });
          },
          error: (apiError: ApiError) => {
            console.error('Password change error:', apiError);
            this.snackBar.open(apiError.error.message, 'OK', {
              duration: 5000,
            });
          },
        });
    }
  }
}
