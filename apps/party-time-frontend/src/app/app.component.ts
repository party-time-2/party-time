import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { AuthStore } from '@party-time/auth';
import { IGoup, ILink, ILogo } from '@party-time/models';
import { FooterComponent, NavbarComponent } from '@party-time/ui';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  selector: 'party-time-root',
  providers: [ComponentStore],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'party-time-frontend';

  vm$ = this.authStore.vm$;

  public logo: ILogo = {
    src: '/assets/ballon.png',
    alt: 'ballon logo',
    href: 'https://www.partytime.com',
    name: 'Party Time',
  };

  mainLinks = [
    { routerLink: '/', name: 'Startseite' },
    { routerLink: 'Login', name: 'auth/login' },
    { routerLink: '404 Page', name: '404' },
    { routerLink: 'Regestrieren', name: 'auth/register' },
  ];

  groups: IGoup[] = [
    {
      name: 'Party Time',
      links: this.mainLinks,
    },
  ];

  ngOnInit(): void {
    this.vm$.subscribe((vm) => {
      if (vm.isAuthenticated === true) {
        this.groups[0].links[1].name = 'Logout';
        this.groups[0].links[1].routerLink = 'auth/logout';
        this.groups[0].links[3].name = 'Profil';
        this.groups[0].links[3].routerLink = 'profile/change';
      } else {
        this.groups[0].links[1].name = 'Login';
        this.groups[0].links[1].routerLink = 'auth/login';
        this.groups[0].links[3].name = 'Regestrieren';
        this.groups[0].links[3].routerLink = 'auth/register';
      }
    });
  }

  constructor(private authStore: AuthStore, private store: Store) {}
}
