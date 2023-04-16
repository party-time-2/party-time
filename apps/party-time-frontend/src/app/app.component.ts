import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IGoup, ILogo } from '@party-time/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { FooterComponent, NavbarComponent } from '@party-time/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  selector: 'party-time-root',
  template: `
    <div class="min-h-screen">
      <party-time-navbar
        [logo]="logo"
        [links]="groups[0].links"
        [cta]="groups[0].links[1]"
      ></party-time-navbar>
      <router-outlet></router-outlet>
    </div>
    <party-time-footer [logo]="logo" [groups]="groups"></party-time-footer>
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
        { routerLink: '/1', name: 'Page 1' },
        { routerLink: '/2', name: 'Page 2' },
        { routerLink: '/3', name: 'Page 3' },
      ],
    },
  ];
}
