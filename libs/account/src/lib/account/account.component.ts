import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MainHeaderComponent,
  PrimaryButtonComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';

@Component({
  selector: 'party-time-account',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
  ],
  template: `<party-time-main-header title="Account" />
    <div class="flex justify-center pl-12 pr-12 pt-12">
      <div class="w-96">
        <section class="col-2 grid">
          <party-time-primary-label
            label="Hier kannst du dein Passwort ändern"
          />
          <party-time-primary-button
            type="button"
            routerLink="/account/change"
            name="Passwort ändern"
          />
        </section>
        <section class="col-2 grid">
          <party-time-primary-label
            label="Hier kannst du deinen Account löschen"
          />
          <party-time-primary-button
            type="button"
            routerLink="/account/delete"
            name="Account löschen"
          />
        </section>
      </div>
    </div>`,
  styles: [],
})
export class AccountComponent {}
