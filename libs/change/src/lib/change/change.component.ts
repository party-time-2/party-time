//implements F013
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MainHeaderComponent,
  PrimaryButtonComponent,
  PrimaryErrorComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeStore } from './+state/change.state';
import { ChangePasswordDTO } from '@party-time/models';

@Component({
  selector: 'party-time-change',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    MainHeaderComponent,
    PrimaryErrorComponent,
    PrimaryLabelComponent,
  ],
  providers: [ChangeStore],
  templateUrl: './change.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeComponent {
  vm$ = this.changeStore.vm$;
  changeForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: [
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
  });

  get f(): { [key: string]: any } {
    return this.changeForm.controls;
  }

  onSubmit(): void {
    if (this.changeForm.valid) {
      this.changeStore.getPasswordChanged(
        this.changeForm.getRawValue() as ChangePasswordDTO
      );
    }
  }

  constructor(
    private changeStore: ChangeStore,
    private formBuilder: FormBuilder
  ) {}
}
