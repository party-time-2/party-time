import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DividerComponent, PrimaryButtonComponent } from '@party-time/ui';
import { Store } from '@ngrx/store';
import { initRegisterPage, register } from '../+state/register.actions';
import { selectRegisterState } from '../+state/register.selectors';
import { AccountRegisterDTO } from '@party-time/models';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'party-time-register',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    DividerComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerState$ = this.store.select(selectRegisterState);
  accountRegisterDTO: AccountRegisterDTO = {
    email: '',
    password: '',
    name: '',
  };
  registerForm = this.formBuilder.group({
    email: [
      this.accountRegisterDTO.email,
      [Validators.required, Validators.email],
    ],
    password: [
      this.accountRegisterDTO.password,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // explain the regex ^(?=.*[a-z])(?=.*[A-Z]).*$
        // ^ - start of the string
        // (?=.*[a-z]) - positive lookahead, at least one lowercase letter
        // (?=.*[A-Z]) - positive lookahead, at least one uppercase letter
        // .* - any number of characters
        // $ - end of the string
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).*$'),
      ],
    ],
    name: [
      this.accountRegisterDTO.name,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch(initRegisterPage());
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password, name } = this.registerForm
        .value as AccountRegisterDTO;
      this.store.dispatch(
        register({ accountRegisterDTO: { email, password, name } })
      );
    }
  }
}
