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
    <div class="w-screen max-w-full">
      <party-time-navbar
        [logo]="logo"
        [links]="groups[0].links"
        [cta]="groups[0].links[1]"
      ></party-time-navbar>
      <main
        class="min-h-screen bg-gradient-to-b from-background-light to-surface-variant-light dark:from-background-dark dark:to-surface-variant-dark"
      >
        <router-outlet></router-outlet>
      </main>
    </div>
    <div
      class="bg-gradient-to-b from-surface-variant-light to-background-light p-4 dark:from-surface-variant-dark dark:to-surface-dark"
    >
      <party-time-footer [logo]="logo" [groups]="groups"></party-time-footer>
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
        { routerLink: 'register', name: 'Regestrieren' },
        { routerLink: '/2', name: 'Page 2' },
        { routerLink: '/3', name: 'Page 3' },
      ],
    },
  ];
}
