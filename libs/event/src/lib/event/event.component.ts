// implements F001
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrimaryButtonComponent,
  MainHeaderComponent,
  PrimaryLabelComponent,
} from '@party-time/ui';

@Component({
  selector: 'party-time-event',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    MainHeaderComponent,
    PrimaryLabelComponent,
  ],
  template: `<party-time-main-header title="Events" />
    <div class="flex justify-center pl-12 pr-12 pt-12">
      <div class="w-96">
        <section class="col-2 grid">
          <party-time-primary-label label="Hier kannst du dein Event planen" />
          <party-time-primary-button
            type="button"
            routerLink="/event/create"
            name="Event planen"
          />
        </section>
        <section class="col-2 grid">
          <party-time-primary-label
            label="Hier kannst du deine eigenen Events überblicken"
          />
          <party-time-primary-button
            type="button"
            routerLink="/event/overview"
            name="Events überblicken"
          />
        </section>
        <section class="col-2 grid">
          <party-time-primary-label
            label="Hier kannst du alle anderen Events überblicken"
          />
          <party-time-primary-button
            type="button"
            routerLink="/event/other"
            name="andere Events überblicken"
          />
        </section>
      </div>
    </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {}
