import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PrimaryButtonComponent } from '@party-time/ui';
import { Store } from '@ngrx/store';
import { initRegisterPage, register } from '../+state/register.actions';
import { REGISTER_FEATURE_KEY } from '../+state/register.reducer';
import { selectRegisterState } from '../+state/register.selectors';
import { AccountRegisterDTO } from '@party-time/models';

@Component({
  selector: 'party-time-register',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  accountRegisterDTO: AccountRegisterDTO = {
    email: 'test',
    password: 'test',
    name: 'test',
  };
  registerState$ = this.store.select(selectRegisterState);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(initRegisterPage());
    this.register();
  }

  register() {
    this.store.dispatch(
      register({ accountRegisterDTO: this.accountRegisterDTO })
    );
  }
}
