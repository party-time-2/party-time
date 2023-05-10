//implements F010
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MainHeaderComponent,
  PrimaryButtonComponent,
  PrimaryErrorComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterStore } from '../+state/register.state';
import { AccountRegisterDTO } from '@party-time/models';

@Component({
  selector: 'party-time-register',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  providers: [RegisterStore],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  vm$ = this.registerStore.vm$;

  /// form group for the register form
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        // explain the regex ^(?=.*[a-z])(?=.*[A-Z])(?=.+[0-9].+)(?=.*[a-zA-Z]+.*[ ,!"§$%&/()=?{}[\].+]+.*[a-zA-Z]+.*).*$
        // 1. (?=.*[a-z]) at least one lowercase letter
        // 2. (?=.*[A-Z]) at least one uppercase letter
        // 3. (?=.+[0-9].+) at least one number
        // 4. (?=.*[a-zA-Z]+.*[ ,!"§$%&/()=?{}[\].+]+.*[a-zA-Z]+.*) at least one special character
        // 5. .* at least one character
        Validators.pattern(
          // eslint-disable-next-line no-useless-escape
          '^(?=.*[a-z])(?=.*[A-Z])(?=.+[0-9].+)(?=.*[a-zA-Z]+.*[ ,!"§$%&/()=?{}[\\].+]+.*[a-zA-Z]+.*).*$'
        ),
      ],
    ],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
    ],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /// submit the register form
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerStore.getAccountDTO(
        this.registerForm.getRawValue() as AccountRegisterDTO
      );
    }
  }

  constructor(
    private registerStore: RegisterStore,
    private formBuilder: FormBuilder
  ) {}
}
