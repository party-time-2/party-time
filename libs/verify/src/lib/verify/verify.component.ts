//implements F014
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingCircleComponent,
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
import { VerifyStore } from '../+state/verify.state';

@Component({
  selector: 'party-time-verify',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    LoadingCircleComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
    PrimaryErrorComponent,
  ],
  providers: [VerifyStore],
  templateUrl: './verify.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent implements OnInit {
  vm$ = this.verifyStore.vm$;

  verifyForm = this.formBuilder.group({
    token: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$'
        ),
      ],
    ],
  });

  ngOnInit(): void {
    this.onSubmit();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.verifyForm.controls;
  }
  onSubmit(): void {
    if (this.verifyForm.valid) {
      this.verifyStore.getVerified(this.verifyForm.value.token as string);
    }
  }
  constructor(
    private verifyStore: VerifyStore,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    const token = this.route.snapshot?.url[0]?.path;
    this.verifyForm.controls.token.setValue(token);
  }
}
