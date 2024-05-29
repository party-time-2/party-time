import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account/account.service';
import { IAccountService } from '../../../models/account-service.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthService } from '../../../models/auth-service.interface';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../../components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AccountDeleteDTO } from '../../../models/dto/account-dto.interface';
import { ApiError } from '../../../models/error.interface';

@Component({
  selector: 'app-delete',
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
        Title="Account löschen"
        data-cy="delete-account-header"
      ></app-page-header>
      <form
        [formGroup]="deleteAccountForm"
        (ngSubmit)="onSubmit()"
        data-cy="delete-account-form"
        class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white px-4 py-6 shadow-md"
      >
        <mat-form-field appearance="fill" data-cy="password-field">
          <mat-label>Passwort</mat-label>
          <input
            matInput
            formControlName="password"
            data-cy="password-input"
            type="password"
          />
          <mat-error
            *ngIf="deleteAccountForm.get('password')?.errors?.['required']"
            data-cy="password-required-error"
          >
            Das Passwort ist erforderlich
          </mat-error>
          <mat-error
            *ngIf="deleteAccountForm.get('password')?.errors?.['minlength']"
            data-cy="password-minlength-error"
          >
            Das Passwort muss mindestens 8 Zeichen lang sein
          </mat-error>
          <mat-error
            *ngIf="deleteAccountForm.get('password')?.errors?.['maxlength']"
            data-cy="password-maxlength-error"
          >
            Das Passwort darf maximal 30 Zeichen lang sein
          </mat-error>
        </mat-form-field>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          data-cy="delete-account-button"
          [disabled]="!deleteAccountForm.valid"
        >
          Account löschen
        </button>
      </form>
    </section> `,
  providers: [AccountService, AuthService],
  styles: ``,
})
export class DeleteComponent {
  private accountService: IAccountService = inject(AccountService);
  private authService: IAuthService = inject(AuthService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  deleteAccountForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
  });

  onSubmit() {
    if (this.deleteAccountForm.valid) {
      this.accountService
        .deleteAccount(this.deleteAccountForm.value as AccountDeleteDTO)
        .subscribe({
          next: () => {
            this.snackBar.open('Account wurde gelöscht', 'OK', {
              duration: 5000,
            });
            this.authService.logout();
            this.router.navigate(['/']);
          },
          error: (apiError: ApiError) => {
            this.snackBar.open(apiError.message, 'OK', {
              duration: 5000,
            });
          },
        });
    }
  }
}
