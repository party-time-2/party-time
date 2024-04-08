import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAuthService } from '../../../models/auth-service.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { ApiError } from '@party-time/models';

@Component({
  selector: 'app-verify',
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
  template: `<section
    class="flex h-screen flex-col items-center justify-center"
  >
    <app-page-header Title="Verify" data-cy="verify-header"></app-page-header>
    <form
      [formGroup]="verifyForm"
      (ngSubmit)="onSubmit()"
      data-cy="verify-form"
      class="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-white px-4 py-6 shadow-md"
    >
      <mat-form-field appearance="fill" data-cy="token-field">
        <mat-label>Token</mat-label>
        <input matInput formControlName="token" data-cy="token-input" />
        <mat-error
          *ngIf="verifyForm.get('token')?.errors?.['required']"
          data-cy="token-required-error"
        >
          Token ist erforderlich.
        </mat-error>
      </mat-form-field>
      <button
        mat-button
        color="primary"
        [disabled]="!verifyForm.valid"
        type="submit"
        data-cy="verify-button"
      >
        Verifizieren
      </button>
    </form>
  </section> `,
  styles: ``,
})
export class VerifyComponent {
  @Input() set token(token: string) {
    this.verifyForm.patchValue({ token });
  }
  @Input() email = '';

  private authService: IAuthService = inject(AuthService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  verifyForm = new FormGroup({
    token: new FormControl('', [Validators.required]),
  });

  private navigateToLogin(email = '') {
    this.router.navigate(['/auth/login'], {
      queryParams: { email },
    });
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.authService
        .verifyEmail(this.verifyForm.value.token as string)
        .subscribe({
          next: () => {
            this.snackBar
              .open('E-Mail wurde erfolgreich verifiziert.', 'zum Login', {
                duration: 5000,
              })
              .afterDismissed()
              .subscribe(() => {
                this.navigateToLogin(this.email);
              });
          },
          error: (apiError: ApiError) => {
            this.snackBar.open(
              apiError.error.message || 'Etwas ist schief gelaufen.',
              'OK',
              {
                duration: 5000,
              }
            );
          },
        });
    }
  }
}
