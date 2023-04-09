import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IGoup, ILogo } from '@party-time/models';
import { NavbarComponent } from '@party-time/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'party-time-root',
  template: `
    <div class="h-screen">
      <party-time-navbar
        [logo]="logo"
        [links]="groups[0].links"
        [cta]="groups[0].links[1]"
      ></party-time-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'party-time-frontend';

  public logo: ILogo = {
    src: '/assets/ballon.png',
    alt: 'ballon logo',
    href: 'https://www.partytime.com',
    name: 'Party Time',
  };

  groups: IGoup[] = [
    {
      name: 'Party Time',
      links: [
        { routerLink: '/', name: 'Startseite' },
        { routerLink: 'datenschutz', name: 'Datenschutz' },
        { routerLink: 'impressum', name: 'Impressum' },
      ],
    },
  ];
}
