//implements F011
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LoadingCircleComponent,
  MainHeaderComponent,
  PrimaryButtonComponent,
  PrimaryErrorComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestDTO } from '@party-time/models';
import { AuthStore } from '../+state/auth.state';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
@Component({
  selector: 'party-time-login',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    LoadingCircleComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  providers: [ComponentStore],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  vm$ = this.authStore.vm$;
  returnUrl = '';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  get f(): { [key: string]: any } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authStore.getAccountLoginDTO(
        this.loginForm.getRawValue() as LoginRequestDTO
      );
    }
  }

  constructor(private authStore: AuthStore, private formBuilder: FormBuilder) {}
}
