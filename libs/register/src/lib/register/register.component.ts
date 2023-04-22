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
  /// select the register state from the store
  registerState$ = this.store.select(selectRegisterState);

  /// DTO for the register form
  accountRegisterDTO: AccountRegisterDTO = {
    email: '',
    password: '',
    name: '',
  };

  /// form group for the register form
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

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  /// convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.store.dispatch(initRegisterPage());
  }

  /// submit the register form
  onSubmit(): void {
    if (this.registerForm.valid) {
      /// get the values from the form
      const { email, password, name } = this.registerForm
        .value as AccountRegisterDTO;
      /// dispatch the register action
      this.store.dispatch(
        register({ accountRegisterDTO: { email, password, name } })
      );
    }
  }
}
