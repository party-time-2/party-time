import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCircleComponent, PrimaryButtonComponent } from '@party-time/ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { initChangePage, loadChangePassword } from './+state/change.actions';
import { ChangePasswordDTO } from '@party-time/models';

@Component({
  selector: 'party-time-change',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    LoadingCircleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './change.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeComponent implements OnInit {
  changeRequestDTO = {
    oldPassword: '',
    newPassword: '',
  };

  changeForm = this.formBuilder.group({
    oldPassword: [this.changeRequestDTO.oldPassword, Validators.required],
    newPassword: [
      this.changeRequestDTO.newPassword,
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
      const { oldPassword, newPassword } = this.changeForm
        .value as ChangePasswordDTO;
      this.store.dispatch(
        loadChangePassword({ changePasswordDTO: { oldPassword, newPassword } })
      );
    }
  }

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(initChangePage());
  }
}
