//implements F011
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LoadingCircleComponent, PrimaryButtonComponent } from '@party-time/ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectAuthState } from '../+state/auth.selectors';
import { Store } from '@ngrx/store';
import { initAuthPage, login, resetError } from '../+state/auth.actions';
import { LoginRequestDTO } from '@party-time/models';
@Component({
  selector: 'party-time-login',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    LoadingCircleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  authState$ = this.store.select(selectAuthState);

  loginRequestDTO = {
    email: '',
    password: '',
  };

  loginForm = this.formBuilder.group({
    email: [this.loginRequestDTO.email, [Validators.required]],
    password: [this.loginRequestDTO.password, Validators.required],
  });

  get f(): { [key: string]: any } {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.store.dispatch(initAuthPage());
  }

  resetError() {
    this.store.dispatch(resetError());
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value as LoginRequestDTO;
      this.store.dispatch(login({ loginRequestDTO: { email, password } }));
    }
  }

  constructor(private store: Store, private formBuilder: FormBuilder) {}
}
