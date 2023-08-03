//implements F012
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../+state/auth.state';
import { ComponentStore } from '@ngrx/component-store';
@Component({
  selector: 'party-time-logout',
  standalone: true,
  imports: [CommonModule],
  providers: [ComponentStore],
  template: '',
})
export class LogoutComponent {
  vm$ = this.authStore.vm$;

  constructor(private authStore: AuthStore) {
    this.authStore.getAccountLogout();
  }
}
