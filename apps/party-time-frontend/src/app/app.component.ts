/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { initAuthPage, loadAuth } from '@party-time/auth';
import { IGoup, ILogo } from '@party-time/models';
import { FooterComponent, NavbarComponent } from '@party-time/ui';
import { selectLoginResponseDTOToken } from 'libs/auth/src/lib/+state/auth.selectors';

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
export class AppComponent implements OnInit {
  title = 'party-time-frontend';

  constructor(private store: Store) {}

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
        { routerLink: 'auth/register', name: 'Registrieren' },
        { routerLink: 'auth/login', name: 'Login' },
        { routerLink: '/auth/change', name: 'Change' },
      ],
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(loadAuth());
    const token = this.store
      .select(selectLoginResponseDTOToken)
      .subscribe((token) => {
        console.log('token', token);
      });

    console.log('token', token);
  }
}
