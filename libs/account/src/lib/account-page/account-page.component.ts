import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'party-time-account-page',
  template: `<section>
    <router-outlet></router-outlet>
  </section> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {}
