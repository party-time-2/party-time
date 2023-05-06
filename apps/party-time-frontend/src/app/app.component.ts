import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@party-time/auth';
import { IGoup, ILink, ILogo } from '@party-time/models';
import { FooterComponent, NavbarComponent } from '@party-time/ui';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  providers: [AuthStore],
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
        <ng-component *ngIf="vm$ | async as vm">
          <pre>{{ vm | json }}</pre>
        </ng-component>
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
export class AppComponent implements OnInit {
  title = 'party-time-frontend';

  vm$ = inject(AuthStore).vm$;

  public logo: ILogo = {
    src: '/assets/ballon.png',
    alt: 'ballon logo',
    href: 'https://www.partytime.com',
    name: 'Party Time',
  };

  registerProfileLink: ILink = {
    routerLink: 'auth/register',
    name: 'Regestrieren',
  };

  loginLogoutLink: ILink = {
    routerLink: 'auth/login',
    name: 'Login',
  };

  groups: IGoup[] = [
    {
      name: 'Party Time',
      links: [
        { routerLink: '/', name: 'Startseite' },
        { routerLink: '404 Page', name: '404' },
        this.registerProfileLink,
        this.loginLogoutLink,
      ],
    },
  ];

  ngOnInit(): void {
    this.vm$.subscribe((vm) => {
      if (vm.isAuthenticated) {
        this.registerProfileLink.name = 'Profil';
        this.registerProfileLink.routerLink = 'profil/change';
        this.loginLogoutLink.name = 'Logout';
        this.loginLogoutLink.routerLink = 'auth/logout';
      }
    });
  }
}
