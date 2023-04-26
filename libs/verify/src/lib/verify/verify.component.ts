import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectVerifyState } from '../+state/verify.selectors';
import { verify } from '../+state/verify.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PrimaryButtonComponent } from '@party-time/ui';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'party-time-verify',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent implements OnInit {
  token: string | null = null;
  // select verify state from the store
  verifyState$ = this.store.select(selectVerifyState);

  verifyForm = this.formBuilder.group({
    token: [
      this.token,
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$'
        ),
      ],
    ],
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    if (this.route !== undefined) {
      // get the token segment from path verify/:token from the url
      this.token = this.route.snapshot.url[0].path;
      this.verifyForm.controls.token.setValue(this.token);
    }
  }

  ngOnInit(): void {}

  /// convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.verifyForm.controls;
  }
  onSubmit(): void {
    if (this.token) {
      this.store.dispatch(verify({ token: this.token }));
    }
  }
}
