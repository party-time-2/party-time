import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@party-time/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'party-time-root',
  template: `
    <party-time-navbar></party-time-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'party-time-frontend';
}
